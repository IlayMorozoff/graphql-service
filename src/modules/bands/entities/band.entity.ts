import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Band {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
