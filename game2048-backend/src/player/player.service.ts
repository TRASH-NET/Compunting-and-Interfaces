import { HttpException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SaveMatchDto } from './dto';
import { UUID } from 'crypto';

@Injectable()
export class PlayerService extends PrismaClient implements OnModuleInit {

	private readonly logger = new Logger("PlayerService");

	constructor(
	) {
		super();
	}

	onModuleInit() {
		this.$connect();
		this.logger.log("DataBase connected");
	}


	async saveMatch(saveMatchDto: SaveMatchDto) {

		const { playerId, score } = saveMatchDto;

		try {

			const newMatch = await this.game.create({
				data: {
					playerId,
					score,
				}
			})

			return {
				newMatch,
			}

		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async getGamesHistory(playerId: UUID) {

		try {

			const gamesHistory = await this.game.findMany({
				where: {
					playerId
				}
			})

			return gamesHistory;

		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

}
