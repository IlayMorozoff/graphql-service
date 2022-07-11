import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Jwt {
  @Field(() => String)
  jwt: string;
}
