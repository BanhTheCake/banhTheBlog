import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Roles } from 'src/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  username: string;

  @Prop({ unique: true })
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String)
  password: string;

  @Prop({ isRequired: false })
  @Field(() => String, { nullable: true })
  img: string;

  @Prop({ isRequired: false })
  refreshToken: string;

  @Prop({ isRequired: false })
  activeToken: string;

  @Prop({ isRequired: false, default: true, type: Boolean })
  @Field(() => Boolean, { defaultValue: true })
  firstLogin: boolean;

  @Prop({ type: String, enum: Roles, default: Roles.USER })
  @Field(() => Roles, { defaultValue: Roles.USER })
  role: Roles;

  @Prop()
  @Field(() => Date)
  createdAt: Date;

  @Prop()
  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
