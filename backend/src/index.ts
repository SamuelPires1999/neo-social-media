import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/UserResolver"

const main = async () => {
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        })
    })

    apolloServer.applyMiddleware({app})

    app.listen(4000, ()=> {
        console.log('server running')
    })
    app.get('/', (_, res)=>{
        res.send('hello')
    })
}

main()