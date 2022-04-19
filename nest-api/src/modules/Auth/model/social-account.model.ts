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
  Unique,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SocialProvidersEnum } from '../enums/user.enum';
import { User } from './user.model';
import { getColumnEnum } from 'src/_common/utils/columnEnum';

@Table({
  timestamps: true,
  indexes: [],
})
@ObjectType()
export class SocialAccount extends Model<SocialAccount> {
  @ForeignKey(() => User)
  @Column({ onDelete: 'CASCADE', onUpdate: 'CASCADE', type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Default(SocialProvidersEnum.GITHUB)
  @Column({ type: getColumnEnum(SocialProvidersEnum) })
  @Field((type) => SocialProvidersEnum)
  provider: SocialProvidersEnum;

  @AllowNull(false)
  @Unique
  @Column
  @Field()
  providerId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
