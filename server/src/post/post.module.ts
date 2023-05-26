import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostResolver } from './resolver/post.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.entity';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { Category, CategorySchema } from 'src/category/category.entity';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => CategoryModule),
    SocketModule,
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
