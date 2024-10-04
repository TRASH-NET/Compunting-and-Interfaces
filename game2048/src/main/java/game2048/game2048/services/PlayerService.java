package game2048.game2048.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import game2048.game2048.dto.CreatePlayerDto;
import game2048.game2048.models.Player;
import game2048.game2048.repository.Game2048Repository;

@Service
public class PlayerService {
    @Autowired
    private Game2048Repository game2048Repository;

    public Player createPlayer(CreatePlayerDto createPlayerDto) {
        Optional<Player> existingPlayerOpt = game2048Repository.findByPlayerName(createPlayerDto.playerName);

        Player player;
        if (existingPlayerOpt.isPresent()) {
            player = existingPlayerOpt.get();
            player.setScore(createPlayerDto.score);
        } else {
            player = new Player(createPlayerDto.playerName, createPlayerDto.score);
        }

        game2048Repository.save(player);

        updateAllRanks();

        return player;

    }

    public List<Player> getPlayers() {
        return game2048Repository.findAll();
    }

    public Player updatePlayer(Player player) {
        return game2048Repository.save(player);
    }

    private void updateAllRanks() {
        List<Player> players = game2048Repository.findAllByOrderByScoreDescLastPlayedAsc();

        for (int i = 0; i < players.size(); i++) {
            players.get(i).setRank((long) (i + 1));
        }
        game2048Repository.saveAll(players);
    }
}
