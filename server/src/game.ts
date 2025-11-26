import { Card, Player } from './../../shared/types';
import { MAX_SEATS } from './constants';
import { shuffleArray } from './util';

function generateDeck() {
  return ['Hearts', 'Diamonds', 'Clubs', 'Spades'].flatMap((suit) =>
    ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].map(
      (rank) =>
        ({
          rank,
          suit,
        } as Card)
    )
  );
}

type Seat = string | null;

type Game = {
  deck: Card[];
  playerMap: { [key: string]: Player };
  seats: Seat[];
};

export function createGame() {
  const game: Game = {
    deck: generateDeck(),
    playerMap: {},
    seats: Array.from({ length: MAX_SEATS }).fill(null) as Seat[],
  };

  function addPlayer(index: number, player: Player) {
    if (index < 0 || index > MAX_SEATS - 1) {
      throw new Error('Invalid seat index');
    }

    if (game.seats[index] !== null) {
      throw new Error('Seat is already taken');
    }

    game.playerMap[player.id] = player;
    game.seats[index] = player.id;
  }

  function removePlayer(index: number, playerId: string) {
    if (game.seats[index] === null) {
      throw new Error('Seat is already empty');
    }

    if (index <= 0 || index > MAX_SEATS - 1) {
      throw new Error('Invalid seat index');
    }

    delete game.playerMap[playerId];
    game.seats[index] = null;

    function shuffleDeck() {
      game.deck = shuffleArray(game.deck);
    }
  }

  return {
    state: game,
    addPlayer,
    removePlayer,
  };
}
