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

const player2: Player = {
  id: '2',
  name: 'Kevin',
  wager: 10,
  bank: 100,
  hand: [],
  split: [],
};

const player3: Player = {
  id: '3',
  name: 'Joe',
  wager: 15,
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

test('dealHand()', () => {
  game.addPlayer(1, player1);
  game.addPlayer(2, player2);
  game.addPlayer(3, player3);
  game.dealHand();

  expect(game.state.playerMap['1'].hand.length).toBe(2);
  expect(game.state.playerMap['2'].hand.length).toBe(2);
  expect(game.state.playerMap['3'].hand.length).toBe(2);
  expect(game.state.playerMap['dealer'].hand.length).toBe(2);
  expect(game.state.deck.length).toBe(44);
});


