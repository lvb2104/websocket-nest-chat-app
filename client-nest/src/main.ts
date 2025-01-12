import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 9002, () => {
        console.log(
            `Server is running on http://localhost:${process.env.PORT ?? 9002}`,
        );
    });
}
bootstrap();
