import {
  Inject,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthServicePort } from '../../domain/ports/primary/auth-service.port';
import { 
  RoleMatchingMode, 
  Unprotected,   
  AuthenticatedUser,
  Public,
  Roles, } from 'nest-keycloak-connect';
import { KeycloakToken } from '../../domain/entities/auth/keycloack-token.model'

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServicePort') private authServicePort: AuthServicePort,
  ) {}

  @Get('login')
  @Redirect('' , HttpStatus.MOVED_PERMANENTLY)
  @Unprotected()
  @ApiOperation({ summary: 'Login' })
  login() {
      return this.authServicePort.getUrlLogin();
  }

  @Get('callback')
  @Unprotected()
  @ApiOperation({ summary: 'Callback' })
  getAccessToken(@Query('code') code: string) {
      return this.authServicePort.getAccessToken(code);
  }

  @Post('refreshToken')
  @Unprotected()
  @ApiOperation({ summary: 'RefreshToken' })
  refreshAccessToken(@Body() token: KeycloakToken) {
      return this.authServicePort.refreshAccessToken(token.refresh_token)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @HttpCode(204)
  logout(@Body() token: KeycloakToken){
      return this.authServicePort.logout(token.refresh_token);
  }

  @Get('me')
  @Public(false)
  getHello(
    @AuthenticatedUser()
    user: any,
  ): string {
    if (user) {
      return `Hello ${user.preferred_username}`;
    } else {
      return 'Hello world!';
    }
  }

  @Get('/frontend') 
  @Roles({
    roles: ['admin'],
    mode: RoleMatchingMode.ALL,
  })
  @ApiBearerAuth('Authorization')
  test(@Req() req) {
    console.log(req.user);
    return {
      name: req.user.preferred_username,
    };
  }
}
