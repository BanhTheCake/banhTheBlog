import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class FavoritePostDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
