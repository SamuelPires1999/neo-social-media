import { FriendShip } from "../entities/Friendship";
import { isAuth } from "../Middlewares/isAuth";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@InputType()
class friendRequestInput {
  @Field()
  sender!: number;

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
    @Arg("options") options: friendRequestInput
  ): Promise<friendResponse> {
    try {
      const friendRequest = await FriendShip.create({
        sender: options.sender,
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
}
