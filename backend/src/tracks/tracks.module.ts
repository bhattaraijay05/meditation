import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Tracks, TracksSchema } from './tracks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tracks.name, schema: TracksSchema }]),
  ],
  providers: [TracksResolver, TracksService],
})
export class TracksModule {}
