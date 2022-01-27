import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  title: string;

  @Field()
  artist: string;

  @Field()
  artwork: string;

  @Field()
  album: string;

  @Field()
  duration: number;

  @Field()
  image: string;

  @Field((type) => [String])
  category: string[];

  @Field((type) => [String])
  type: string[];
}
