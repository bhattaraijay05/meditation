import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTrackInput } from './create-track.input';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {
  @Field()
  id: string;
}

@InputType()
export class UpdateTrackTitle extends PartialType(CreateTrackInput) {
  @Field()
  id: string;
}
