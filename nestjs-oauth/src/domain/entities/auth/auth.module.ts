import { Module } from '@nestjs/common';

import { AuthController } from '../../../interfaces/http/auth.controller';
import { AuthService } from '../../../app/services/auth.service';

import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from '../../../infra/config/keycloak-config.service';
import { ConfigModule } from '../../../infra/config/config.module';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule],
    }),
    AuthModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthServicePort',
      useClass: AuthService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}
