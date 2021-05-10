import 'reflect-metadata'
import {ApolloServer} from "apollo-server-express"
import express from "express"
import {buildSchema} from "type-graphql"
import {UserResolver} from "./resolvers/UserResolver"
import {createConnection} from 'typeorm'
import {User} from './entities/User'
import {Post} from './entities/Post'

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        username: 'postgres',
        password: '12345',
        database: 'postgres',
        logging: ['query', 'error'],
        entities: [Post, User],
        synchronize: true
    })

    conn.isConnected ? console.log('db up') : console.log('db not up wtf...c')

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        })
    })

    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log('server running')
    })
    app.get('/', (_, res) => {
        res.send('hello')
    })
}

main()
