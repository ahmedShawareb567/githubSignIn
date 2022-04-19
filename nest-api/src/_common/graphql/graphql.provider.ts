import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Request } from 'express';
import { join } from 'path';
import { ModuleRef } from '@nestjs/core';
import { User } from 'src/modules/Auth/model/user.model';
import { AuthService } from 'src/modules/Auth/services/auth.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  private authService: AuthService;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    // Inject userService with this approach because userService does not exist at this time
    this.authService = await this.moduleRef.create(AuthService);
  }
  createGqlOptions(): GqlModuleOptions | any {
    return {
      playground: true,
      introspection: true,
      tracing: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      installSubscriptionHandlers: true,
      context: async ({ req, connection }) => {
        let currentUser: User;

        // Auth for subscription connections
        if (connection && connection.context)
          currentUser = connection.context.currentUser;
        else
          currentUser = await this.authService.getUserFromReqHeaders(
            <Request>req,
          );

        return {
          req,
          currentUser,
        };
      },
    };
  }
}
