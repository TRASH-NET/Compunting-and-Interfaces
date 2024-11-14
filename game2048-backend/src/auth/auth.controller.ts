import { Controller, Get, Post, Body, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Response } from 'express';
import { Token } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { ParseEmailPipe } from 'src/pipes';

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
				secure: process.env.NODE_ENV === 'production',
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

		return { token };
	}

	@UseGuards(AuthGuard)
	@Delete('email/:email')
	deleteAccount(@Param('email', ParseEmailPipe) email: string) {
		return this.authService.deleteAccount(email);
	}
}
