import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type CategoryDocument = HydratedDocument<Category>;

@ObjectType()
@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  label: string;

  @Prop()
  @Field(() => String)
  slug: string;

  @Prop()
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field(() => Date)
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
