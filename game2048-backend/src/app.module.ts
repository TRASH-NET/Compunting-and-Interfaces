import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from './config';
import { PlayerModule } from './player/player.module';

@Module({
	imports: [
		AuthModule,
		JwtModule.register({
			global: true,
			secret: envs.jwtSecret,
			signOptions: { expiresIn: '7d' },
		}),
		PlayerModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
