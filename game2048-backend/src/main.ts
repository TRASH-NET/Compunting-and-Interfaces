import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

	const logger = new Logger('App2048-Main');

	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: envs.frontendHost,
			credentials: true,
		},
	});

	app.setGlobalPrefix('api', {
		exclude: [{
			path: '',
			method: RequestMethod.GET,
		}]
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	await app.listen(envs.port);


	logger.log(`2048 App is running on: ${envs.port}`);
}
bootstrap();