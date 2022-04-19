import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/DB/database.module';
import { socialAccountProvider } from './providers/social-account.provider';
import { userProvider } from './providers/user.provider';
import { AuthResolver } from './resolver/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthService,
    AuthResolver,
    ...userProvider,
    ...socialAccountProvider,
  ],
  exports: [AuthService, ...userProvider, ...socialAccountProvider],
})
export class AuthModule {}
