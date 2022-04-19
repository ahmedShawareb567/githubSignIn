import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/DB/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UploadModule } from './_common/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { AuthModule } from './modules/Auth/auth.module';
import { GqlConfigService } from './_common/graphql/graphql.provider';
import { AuthService } from './modules/Auth/services/auth.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule, DatabaseModule],
      useClass: GqlConfigService,
      inject: [AuthService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
