import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Response } from 'express';
import { Token } from 'src/decorators';
import { AuthGuard } from 'src/guards';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('register')
	registerUser(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.registerUser(registerUserDto);
	}

	@Post('login')
	async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {

		try {
			const { token } = await this.authService.loginUser(loginUserDto);

			res.cookie('authentication', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			});

			return res.status(200).json({ message: 'logged successfully', token });
		} catch (error) {
			return res.status(400).json({ status: error.status, message: error.message });
		}
	}

	@UseGuards(AuthGuard)
	@Get('verify')
	verifyToken(@Token() token: string) {
		return {
			message: 'Token verified',
			token
		};
	}

	@UseGuards(AuthGuard)
	@Post('logout')
	async logout(@Token() token: string, @Res() res: Response) {
		try {
			await this.authService.logout(token);

			res.clearCookie('authentication', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
			});

			return res.send({ message: 'Logged out successfully' });
		} catch (error) {
			return res.status(400).json({ status: error.status, message: error.message });
		}
	}
}
