import { User } from 'src/modules/Auth/model/user.model';

export interface GqlContext {
  currentUser?: User;
  req: Request;
}
