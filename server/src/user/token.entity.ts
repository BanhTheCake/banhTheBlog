import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type TokenDocument = HydratedDocument<Token>;

@ObjectType()
@Schema({
  timestamps: true,
  collection: 'tokens',
})
export class Token {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  token: string;

  @Prop()
  @Field(() => String)
  userId: string;

  @Prop({ expires: 60 * 60 })
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field(() => Date)
  updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
