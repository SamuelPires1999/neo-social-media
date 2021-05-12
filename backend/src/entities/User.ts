import {Field, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {Post} from './Post'
import {FriendShip} from "./Friendship";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({unique: true})
    username!: string;

    @Field()
    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @ManyToOne(()=> FriendShip, friendship => friendship.sender)
    friendList: FriendShip[]

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

}
