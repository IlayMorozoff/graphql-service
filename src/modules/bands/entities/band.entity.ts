import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Member } from './member.entity';

@ObjectType()
export class Band {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  origin?: string;

  @Field(() => [Member], { nullable: 'itemsAndList' })
  members?: Member[];

  @Field({ nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];
}
