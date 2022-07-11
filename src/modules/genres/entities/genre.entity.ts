import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class DeletedGenre {
  @Field(() => ID, { name: 'id' })
  _id: string;
}

@ObjectType()
export class Genre extends DeletedGenre {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  year?: number;
}
