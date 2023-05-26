import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from './user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/jwt.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { GmailService } from './services/gmail.service';
import { Token, TokenSchema } from './token.entity';
import { ForgotTokenStrategy } from './strategies/forgotToken.strategy';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({}),
    forwardRef(() => PostModule),
  ],
  providers: [
    UserResolver,
    UserService,
    TokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ForgotTokenStrategy,
    GmailService,
  ],
  exports: [UserService, TokenService, GmailService],
})
export class UserModule {}
