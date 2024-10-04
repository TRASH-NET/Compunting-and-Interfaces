package game2048.game2048.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import game2048.game2048.dto.CreatePlayerDto;
import game2048.game2048.models.Player;
import game2048.game2048.services.PlayerService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/players")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/create")
    public ResponseEntity<Player> createPlayer(@Valid @RequestBody CreatePlayerDto createPlayerDto) {
        Player player = playerService.createPlayer(createPlayerDto);
        return new ResponseEntity<>(player, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getPlayers();
    }

}
