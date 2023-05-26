import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL_MONGODB'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'blogGraphQL',
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const OAuth2 = google.auth.OAuth2;
        const myOAuth2Client = new OAuth2({
          clientId: config.get<string>('GOOGLE_CLIENT_ID'),
          clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
          redirectUri: 'https://developers.google.com/oauthplayground',
        });
        myOAuth2Client.setCredentials({
          refresh_token: config.get<string>('GOOGLE_REFRESH_TOKEN'),
        });
        const accessToken = myOAuth2Client.getAccessToken();
        const mailerOptions: MailerOptions = {
          transport: {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: config.get<string>('GOOGLE_USER'),
              clientId: config.get<string>('GOOGLE_CLIENT_ID'),
              clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
              refreshToken: config.get<string>('GOOGLE_REFRESH_TOKEN'),
              accessToken: accessToken,
            },
          },
        };
        return mailerOptions;
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        if (error?.extensions?.originalError) {
          return {
            ...(error?.extensions?.originalError as GraphQLFormattedError),
          };
        }
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CategoryModule,
    PostModule,
    SocketModule,
  ],
})
export class AppModule {}
