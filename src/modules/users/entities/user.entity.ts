import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { name: 'secondName', nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
