import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackInput } from './dto/create-track.input';
import { Tracks, TracksDocument } from './tracks.schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Tracks.name) private tracksModel: Model<TracksDocument>,
  ) {}

  async create(input: CreateTrackInput): Promise<Tracks> {
    const createdTracks = new this.tracksModel(input);
    return createdTracks.save();
  }

  async findAll(): Promise<Tracks[]> {
    return this.tracksModel.find().exec();
  }

  async findOne(id: string): Promise<Tracks> {
    return this.tracksModel.findOne({ id }).exec();
  }

  async update(id: string, input: CreateTrackInput): Promise<Tracks> {
    return this.tracksModel.findByIdAndUpdate(id, input);
  }

  async remove(id: string): Promise<Tracks> {
    return (await this.tracksModel.findOne({ id }).exec()).deleteOne();
  }

  async updateTitle(id: string, title: string): Promise<Tracks> {
    return this.tracksModel
      .findOne({ id })
      .exec()
      .then((track) => {
        track.title = title;
        return track.save();
      });
  }
}
