import { MAX_SEATS } from './constants';
import { Card, Dealer, Player, Seat } from './types';
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

type Game = {
  deck: Card[];
  discard: Card[];
  playerMap: { [key: string]: Player | Dealer };
  seats: [Seat, Seat, Seat, Seat, Seat, 'dealer'];
};

export function createGame() {
  const game: Game = {
    deck: shuffleArray(generateDeck()),
    discard: [],
    playerMap: {
      dealer: {
        id: 'dealer',
        name: 'Dealer',
        hand: [],
      },
    },
    seats: [null, null, null, null, null, 'dealer'],
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

    if (game.seats[index] === 'dealer') {
      throw new Error('Cannot remove dealer');
    }

    delete game.playerMap[playerId];
    game.seats[index] = null;
  }

  function shuffleDiscard() {
    game.deck = shuffleArray(game.discard);
    game.discard = [];
  }

  function dealCards() {
    game.seats.forEach((playerId) => {
      if (playerId === null) {
        return;
      }

      if (game.deck.length === 0) {
        shuffleDiscard();
      }

      const card = game.deck.pop();

      game.playerMap[playerId].hand.push(card!);
    });
  }

  function dealHand() {
    dealCards();
    dealCards();
  }

  return {
    state: game,
    addPlayer,
    removePlayer,
    dealHand,
  };
}
