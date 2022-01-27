import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tracks {
  @Prop()
  id: string;

  @Prop()
  url: string;

  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  artwork: string;

  @Prop()
  album: string;

  @Prop()
  duration: number;

  @Prop()
  image: string;

  @Prop((type) => [String])
  category: string[];

  @Prop((type) => [String])
  type: string[];
}

export type TracksDocument = Tracks & Document;
export const TracksSchema = SchemaFactory.createForClass(Tracks);
