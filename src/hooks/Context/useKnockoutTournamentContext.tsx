"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  KnockoutMatch,
  KnockoutTournament,
  Participant,
} from "../../types/tournament";
import useAxios from "~src/hooks/useAxios";

/* CONTEXT */
type KnockoutTournamentContextProps = {
  editKnockoutMatch: KnockoutMatch | null;
  fetchKnockout(id?: number): Promise<void>;
  knockoutEditPermission: boolean;
  knockoutMatch: KnockoutMatch | null;
  knockoutTournament: KnockoutTournament | null;
  participantsCount: number;
  participantsLookup: { [key: number]: Participant };
  setEditKnockoutMatch: React.Dispatch<
    React.SetStateAction<KnockoutMatch | null>
  >;
  setKnockoutEditPermission: React.Dispatch<React.SetStateAction<boolean>>;
  setKnockoutMatch: React.Dispatch<React.SetStateAction<KnockoutMatch | null>>;
  setKnockoutTournament: React.Dispatch<
    React.SetStateAction<KnockoutTournament | null>
  >;
};

const KnockoutTournamentContext = createContext<KnockoutTournamentContextProps>(
  {} as KnockoutTournamentContextProps,
);

/* HOOK */
export const useKnockoutTournamentContext = () =>
  useContext(KnockoutTournamentContext);

/* CONTEXT PROVIDER */
export type KnockoutTournamentContextProviderProps = {
  children: React.ReactNode;
};

export const KnockoutTournamentContextProvider = ({
  children,
}: KnockoutTournamentContextProviderProps) => {
  const [editKnockoutMatch, setEditKnockoutMatch] =
    useState<KnockoutMatch | null>(null);
  const [knockoutEditPermission, setKnockoutEditPermission] =
    useState<boolean>(false);
  const [knockoutMatch, setKnockoutMatch] = useState<KnockoutMatch | null>(
    null,
  );
  const [knockoutTournament, setKnockoutTournament] =
    useState<KnockoutTournament | null>(null);
  const [participantsLookup, setParticipantsLookup] = useState<{
    [key: number]: Participant;
  }>({});

  const { get } = useAxios();

  const participantsCount = Object.keys(participantsLookup).length;

  useEffect(() => {
    if (knockoutTournament === null) {
      return;
    }

    const newParticipantsLookup: { [key: number]: Participant } = {};
    for (const participant of knockoutTournament.participants) {
      newParticipantsLookup[participant._id] = participant;
    }
    setParticipantsLookup(newParticipantsLookup);

    if (knockoutMatch === null) {
      setKnockoutMatch({ ...knockoutTournament.sortedMatches[0]![0]! });
    } else {
      for (const stage of knockoutTournament.sortedMatches) {
        for (const match of stage) {
          if (match._id === knockoutMatch._id) {
            setKnockoutMatch({ ...match });
            break;
          }
        }
      }
    }
  }, [knockoutTournament]);

  const fetchKnockout = async (id?: number) => {
    const knockoutId = id ?? knockoutTournament?._id;
    if (knockoutId === undefined) {
      throw Error("No knockout id found");
    }
    const result = await get(`/knockout-tournament/${knockoutId}`, {
      withCredentials: true,
    });
    const { editPermission, tournament } = result.data as {
      editPermission: boolean;
      tournament: {
        _id: number;
        created: string;
        matches: KnockoutMatch[];
        name: string;
        participants: Participant[];
        public: boolean;
        updated: string;
      };
    };
    let stagesCount = 0;
    let participantsCount = Math.ceil(tournament.participants.length / 2);
    while (participantsCount !== 1) {
      participantsCount /= 2;
      stagesCount++;
    }
    const sortedMatches: KnockoutMatch[][] = Array.from({
      length: stagesCount + 1,
    }).map(() => []);
    for (const stage of tournament.matches) {
      sortedMatches[stage.stage_number]?.push(stage);
    }

    setKnockoutTournament({
      _id: tournament._id,
      created: tournament.created,
      name: tournament.name,
      participants: tournament.participants,
      public: tournament.public,
      sortedMatches: sortedMatches,
      updated: tournament.updated,
    } as KnockoutTournament);
    setKnockoutEditPermission(editPermission);
  };

  return (
    <KnockoutTournamentContext.Provider
      value={{
        editKnockoutMatch,
        fetchKnockout,
        knockoutEditPermission,
        knockoutMatch,
        knockoutTournament,
        participantsCount,
        participantsLookup,
        setEditKnockoutMatch,
        setKnockoutEditPermission,
        setKnockoutMatch,
        setKnockoutTournament,
      }}
    >
      {children}
    </KnockoutTournamentContext.Provider>
  );
};
