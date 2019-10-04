import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            ignoreTrailingSlash: true,
        }),
    );

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: true,
        }),
    );

    await app.listen(3000);
}
bootstrap();
