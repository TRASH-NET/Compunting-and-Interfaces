import { HttpException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { LoginUserDto, RegisterUserDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from "src/interfaces";
import { envs } from "src/config";

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

	private readonly logger = new Logger("AuthService");

	constructor(
		private readonly jwtService: JwtService
	) {
		super();
	}

	onModuleInit() {
		this.$connect();
		this.logger.log("DataBase connected");
	}


	async registerUser(registerUserDto: RegisterUserDto) {

		const { playerName, password } = registerUserDto;

		try {

			const validatePlayerName = await this.player.findUnique({
				where: {
					playerName
				}
			});

			if (validatePlayerName) {
				throw new HttpException("Player name already exists, try with another", 400);
			}
			const newPlayer = await this.player.create({
				data: {
					playerName,
					password: bcrypt.hashSync(password, 10),
					rank: null,
				}
			})
			//eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password: __, ...player } = newPlayer;

			return {
				player,
			}

		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async loginUser(loginUserDto: LoginUserDto) {

		const { playerName, password } = loginUserDto;

		try {

			const validateUserExist = await this.player.findUnique({
				where: {
					playerName,
				}
			})

			if (!validateUserExist) {
				throw new HttpException(`Player do not exist`, 400);
			}

			const validatePassword = bcrypt.compareSync(password, validateUserExist.password);

			if (!validatePassword) {
				throw new HttpException("Invalid password", 400);
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password: __, ...player } = validateUserExist;
			const token = await this.signJWT(player);

			return {
				player,
				token
			}


		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async signJWT(payload: IJwtPayload) {
		try {
			return this.jwtService.sign(payload);
		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async verifyToken(token: string) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { iat, exp, ...player } = this.jwtService.verify(token, {
				secret: envs.jwtSecret
			});

			return {
				token: await this.signJWT(player)
			};
		} catch (error) {
			throw new HttpException(error.message, 401);
		}
	}

	async deleteAccount(playerName: string) {
		try {
			const player = await this.player.findUnique({
				where: {
					playerName
				}
			});

			if (!player) {
				throw new HttpException(`Player with ${playerName} doesn't exist`, 400);
			}

			const deletedPlayer = await this.player.delete({
				where: {
					playerName
				},
			});

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password: _, ...dataPlayer } = deletedPlayer;

			return {
				dataPlayer,
				message: "Account deleted successfully"
			};
		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

}