package game2048.game2048.repository;

import org.springframework.stereotype.Repository;
import game2048.game2048.models.Player;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository

public interface Game2048Repository extends JpaRepository<Player, Long> {
    Optional<Player> findByPlayerName(String playerName);

    List<Player> findAllByOrderByScoreDescLastPlayedAsc();
}