import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { currentUser } = ctx.getContext() as GqlContext;

    if (!currentUser)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return true;
  }
}
