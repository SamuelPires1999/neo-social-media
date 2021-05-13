import { FriendShip } from "../entities/Friendship";
import { isAuth } from "../Middlewares/isAuth";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  //Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";

@InputType()
class friendRequestInput {
  @Field()
  receiver!: number;

  @Field()
  status!: boolean;
}

@ObjectType()
class FriendRequestFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class friendResponse {
  @Field(() => [FriendRequestFieldError], { nullable: true })
  errors?: FriendRequestFieldError[];

  @Field(() => FriendShip, { nullable: true })
  friendRequest?: FriendShip;
}

@Resolver(FriendShip)
export class FriendshipResolver {
  @Mutation(() => friendResponse)
  @UseMiddleware(isAuth)
  async requestFriend(
    @Arg("options") options: friendRequestInput,
    @Ctx() { req }: MyContext
  ): Promise<friendResponse> {
    try {
      const friendRequest = await FriendShip.create({
        sender: req.session.userId,
        receiver: options.receiver,
        status: false,
      }).save();

      return { friendRequest };
    } catch (error) {
      return {
        errors: [
          {
            field: "sender / receiver",
            message: "Something went wrong, re-login and try again please",
          },
        ],
      };
    }
  }

  //   @Query()
  //   @UseMiddleware(isAuth)
  //   async getRequests(
  //       @Arg('')
  //   ) {

  //   }
}
