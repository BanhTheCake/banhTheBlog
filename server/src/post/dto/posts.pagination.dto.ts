import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@ArgsType()
export class PostsPaginationDto {
  @Field(() => Int, { nullable: true, defaultValue: 4 })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;
}
