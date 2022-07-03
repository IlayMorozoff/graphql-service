import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class DeletedTrack {
  @Field(() => ID)
  _id: string;
}

@ObjectType()
export class Track extends DeletedTrack {
  @Field()
  title: string;

  @Field({ nullable: true, name: 'albums' })
  albumId?: string;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'bands' })
  bandsIds?: string[];

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'genres' })
  genresIds?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList', name: 'artists' })
  artistsIds?: string[];
}

// @Prop({ required: true })
// title: string;

// @Prop()
// albumId: string;

// @Prop()
// bandsIds: string[];

// @Prop()
// artistsIds: string[];

// @Prop()
// duration: number;

// @Prop()
// released: number;

// @Prop()
// genresIds: string[];
