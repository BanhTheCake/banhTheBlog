import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';

export type PostDocument = HydratedDocument<Post>;

@ObjectType()
@Schema({
  timestamps: true,
  collection: 'posts',
})
export class Post {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  slug: string;

  @Prop()
  @Field(() => String)
  content: string;

  @Prop()
  @Field(() => String)
  subContent: string;

  @Prop()
  @Field(() => String)
  img: string;

  @Prop({ type: Number, default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  count: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user: User;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
      },
    ],
  })
  categories: Category[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  })
  @Field(() => [String], { defaultValue: [] })
  favoritesUser: User[];

  @Prop()
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field(() => Date)
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
