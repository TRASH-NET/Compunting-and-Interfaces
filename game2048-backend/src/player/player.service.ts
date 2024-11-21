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
				},
			});

			const player = await this.player.findUnique({
				where: { id: playerId },
			});

			if (!player) {
				throw new HttpException('Player not found', 404);
			}

			if (score > (player.bestScore ?? 0)) {
				await this.player.update({
					where: { id: playerId },
					data: {
						bestScore: score,
						lastPlayed: new Date(),
					},
				});
			} else {
				await this.player.update({
					where: { id: playerId },
					data: {
						lastPlayed: new Date(),
					},
				});
			}

			await this.calculateRank();

			return {
				newMatch,
			};
		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async calculateRank() {
		try {
			const players = await this.player.findMany({
				select: {
					id: true,
					bestScore: true,
					updatedAt: true,
					createdAt: true,
				},
				orderBy: [
					{ bestScore: 'desc' },
					{ updatedAt: 'desc' },
					{ createdAt: 'asc' },
				],
			});

			await this.$transaction(
				players.map((player, index) =>
					this.player.update({
						where: { id: player.id },
						data: { rank: -(index + 1) },
					})
				)
			);

			await this.$transaction(
				players.map((player, index) =>
					this.player.update({
						where: { id: player.id },
						data: { rank: index + 1 },
					})
				)
			);

			this.logger.log('Rank recalculated successfully');
		} catch (error) {
			this.logger.error(`Error recalculating rank: ${error.message}`);
			throw new HttpException('Error recalculating rank', 500);
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

	async getBestScore(playerId: UUID) {

		try {

			const player = await this.player.findUnique({
				where: { id: playerId }
			})

			if (!player) {
				throw new HttpException('Player not found', 404);
			}

			return player.bestScore;

		} catch (error) {
			throw new HttpException(error.message, 400);
		}
	}

	async getRanking() {
		try {
			const ranking = await this.player.findMany({
				select: {
					id: true,
					playerName: true,
					bestScore: true,
					lastPlayed: true,
					rank: true,
				},
				orderBy: { rank: 'asc' },
			});

			return ranking;
		} catch (error) {
			this.logger.error(`Error fetching global ranking: ${error.message}`);
			throw new HttpException('Error fetching global ranking', 500);
		}
	}

}
