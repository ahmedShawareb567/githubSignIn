import { User } from '../model/user.model';

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
