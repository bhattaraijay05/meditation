import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://dbuser:dbuser@cluster0.caszp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    TracksModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
