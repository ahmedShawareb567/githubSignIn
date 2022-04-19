import { SocialAccount } from '../model/social-account.model';

export const socialAccountProvider = [
  {
    provide: 'SOCIAL_REPOSITORY',
    useValue: SocialAccount,
  },
];
