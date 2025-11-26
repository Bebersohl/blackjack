export interface ApiResponse {
  message: string;
  timestamp: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Player = {
  id: string;
  name: string;
  wager: number;
  bank: number;
  hand: Card[];
  split: Card[];
};

export type Card = {
  suit: Suit;
  rank: Rank;
};

export type Suit = 'heart' | 'diamond' | 'club' | 'spade';

export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';
