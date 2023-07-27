import type { Country } from "../constants/COUNTRIES";
import type { TournamentType } from "../constants/TYPES";

export type Matches = KnockoutMatch[][];

export type NewKnockoutMatch = {
  participants: [NewParticipant | null, NewParticipant | null];
  information?: string;
  winner?: number;
};
export type NewParticipant = Omit<Participant, "_id">;
export type NewTournament = {
  active: boolean;
  // matches: Matches;
  name: string;
  description: string;
  logo?: File;
  participants: {
    list: NewParticipant[];
    max: number;
    min?: number;
    show: number;
  };
  type?: TournamentType;
};

export type Participant = {
  _id: number;
  country_id?: Country;
  name: string;
  team: string;
};

export type KnockoutMatchStatus = "future" | "past" | "live";

export type KnockoutMatchWinner = 0 | 1 | 2;

export type KnockoutMatch = {
  _id: number;
  date: Date | null;
  information?: string;
  match_number: number;
  participant_1_id: number;
  participant_2_id: number;
  stage_number: number;
  status: KnockoutMatchStatus;
  winner: KnockoutMatchWinner;
};

export type KnockoutTournament = {
  _id: number;
  created: string;
  name: string;
  participants: Participant[];
  public: boolean;
  sortedMatches: KnockoutMatch[][];
  updated: string;
};

export type Tournament = {
  _id: number;
  description: string;
  name: string;
  participants: number;
  created: string;
  type: string;
  updated: string;
};
