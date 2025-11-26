import { createGame } from './game';
import { Player } from './types';

let game: ReturnType<typeof createGame>;

const player1: Player = {
  id: '1',
  name: 'Brandon',
  wager: 5,
  bank: 100,
  hand: [],
  split: [],
};

beforeEach(() => {
  game = createGame();
});

test('addPlayer()', () => {
  game.addPlayer(0, player1);

  expect(game.state.seats[0]).toBe('1');
  expect(game.state.playerMap[player1.id]).toBe(player1);
});

test('removePlayer()', () => {
  game.addPlayer(3, player1);
  game.removePlayer(3, '1');

  expect(game.state.seats[3]).toBe(null);
  expect(game.state.playerMap[player1.id]).toBe(undefined);
});
