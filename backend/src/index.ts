import 'reflect-metadata'
import {ApolloServer} from "apollo-server-express"
import express from "express"
import {buildSchema} from "type-graphql"
import {UserResolver} from "./resolvers/UserResolver"
import {createConnection} from 'typeorm'
import {User} from './entities/User'
import {Post} from './entities/Post'
import Redis from 'ioredis'
import session from 'express-session'
import cors from 'cors'
import connectRedis from 'connect-redis'
import {FriendShip} from './entities/Friendship'

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        username: 'postgres',
        password: '12345',
        database: 'postgres',
        logging: ['query', 'error'],
        entities: [Post, User, FriendShip],
        synchronize: true
    })

    conn.isConnected ? console.log('db up') : console.log('db not up wtf...c')

    const app = express()

    const RedisStore = connectRedis(session)
    const redis = new Redis()

    app.use(cors())

    app.use(session({
        name: 'qid',
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly:true,
            sameSite: 'lax',
            secure: false,
            domain: undefined,
        },
        saveUninitialized: false,
        secret: 'redistokensecret',
        resave: false
    }))

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
