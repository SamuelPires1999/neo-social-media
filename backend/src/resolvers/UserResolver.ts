import { User } from "../entities/User";
import {Arg, Field, Mutation, ObjectType, Resolver, InputType, Ctx, Query} from "type-graphql";
import {validateRegister} from "../utils/vaidateRegister";
import {MyContext} from "../types";
import {getConnection} from "typeorm";

@InputType()
export class UsernamePasswordInput {
    @Field()
    email: string;
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}


@Resolver(User)
export class UserResolver {

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options : UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse>
    {
        const errors = validateRegister(options)
        if(errors){
            return {errors}
        }
        let user
        try{
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: options.username,
                    email: options.email,
                    password: options.password,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        }catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already taken",
                        },
                    ],
                };
            }
        }
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes("@")
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        );
        if (!user) {
            return {
                errors: [
                    {
                        field: "usernameOrEmail",
                        message: "that username doesn't exist",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        console.log(req)

        return {
            user,
        };
    }
}