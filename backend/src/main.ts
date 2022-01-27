import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const HOST = '192.168.100.236';
const PORT = 3001;

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
    console.log(`Graphql running on http://${HOST}:${PORT}/graphql`);
  });
})();
