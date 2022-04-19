import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  indexes: [],
})
@ObjectType()
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field((type) => ID)
  id: string;

  @Default(
    `https://ui-avatars.com/api/?name=Github&background=F55353&color=fff`,
  )
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  profilePicture?: string;

  @Column
  @Field(() => String)
  userName: string;

  @Unique
  @Column
  @Field(() => String)
  email: string;

  @Column
  password?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
