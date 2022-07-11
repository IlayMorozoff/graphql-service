import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field({ name: 'secondName' })
  lastName: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
