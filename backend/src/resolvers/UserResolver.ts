import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => String)
    async register(){
        return "Register query"
    }
    @Query(() => String)
    async login(){
        return "Login query"
    }
}