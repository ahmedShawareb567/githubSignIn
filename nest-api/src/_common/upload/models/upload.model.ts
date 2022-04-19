import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  Default,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'files' })
@ObjectType()
export class file extends Model<file> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Field(() => ID)
  id: string;

  @AllowNull(false)
  @Column
  @Field(() => String)
  name: string;

  @AllowNull(false)
  @Column
  @Field(() => String)
  path: string;

  @AllowNull(false)
  @Column
  @Field(() => String)
  size: string;

  @AllowNull(false)
  @Column
  @Field(() => String)
  mimeType: string;
}
