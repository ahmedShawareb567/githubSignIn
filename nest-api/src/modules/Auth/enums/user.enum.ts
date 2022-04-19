import { registerEnumType } from '@nestjs/graphql';

export enum SocialProvidersEnum {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  GITHUB = 'GITHUB',
}
registerEnumType(SocialProvidersEnum, { name: 'SocialProvidersEnum' });
