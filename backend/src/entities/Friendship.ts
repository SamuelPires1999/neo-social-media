import { ObjectType, Field } from 'type-graphql'
import { Entity, Column, PrimaryGeneratedColumn,  UpdateDateColumn, BaseEntity,  CreateDateColumn,   ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
@ObjectType()
export class FriendShip extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({default: false})
    status: boolean

    @Field()
    @ManyToOne(_=> User, user => user.id)
    sender: number

    @Field()
    @ManyToOne(_=> User, user => user.id)
    receiver: number

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

