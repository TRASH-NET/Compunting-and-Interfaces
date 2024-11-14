import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { SaveMatchDto } from './dto';
import { UUID } from 'crypto';

@Controller('player')
export class PlayerController {
	constructor(private readonly playerService: PlayerService) { }

	@Post("save-match")
	saveMatch(@Body() saveMatchDto: SaveMatchDto) {
		return this.playerService.saveMatch(saveMatchDto);
	}


	@Get('match-history/:playerId')
	getGamesHistory(@Param('playerId', ParseUUIDPipe) playerId: UUID) {
		return this.playerService.getGamesHistory(playerId);

	}
}
