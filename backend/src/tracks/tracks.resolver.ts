import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTrackInput } from './dto/create-track.input';
import { Track } from './entities/track.entity';
import { TracksService } from './tracks.service';

@Resolver(() => Track)
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Mutation(() => Track)
  async createTrack(@Args('input') input: CreateTrackInput) {
    return this.tracksService.create(input);
  }

  @Query(() => [Track], { name: 'tracks' })
  async findAll() {
    return this.tracksService.findAll();
  }

  @Query(() => Track, { name: 'track' })
  async findOne(@Args('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Mutation(() => Track)
  async updateTrack(
    @Args('id') id: string,
    @Args('input') input: CreateTrackInput,
  ) {
    return this.tracksService.update(id, input);
  }

  @Mutation(() => Track)
  async removeTrack(@Args('id') id: string) {
    return this.tracksService.remove(id);
  }

  @Mutation(() => Track)
  async updateTitle(@Args('id') id: string, @Args('title') title: string) {
    return this.tracksService.updateTitle(id, title);
  }
}
