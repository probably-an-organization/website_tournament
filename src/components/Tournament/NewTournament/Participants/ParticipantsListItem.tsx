import { FiTrash2 } from "react-icons/fi";

import NationalityBadgeSelector from "../../NationalityBadgeSelector";
import Input from "~src/components/Input";
import { useTournamentContext } from "~src/hooks/context/useTournamentContext";
import type { Participant } from "~src/types/tournament";

export type CreateDancerListItemProps = {
  index: number;
};

function ParticipantsListItem({ index }: CreateDancerListItemProps) {
  const { setNewTournament, newTournament } = useTournamentContext();

  const handleChange = (data: { [key: string]: string }) => {
    setNewTournament((prev) => {
      const tournament = { ...prev };
      const participants = tournament.participants.list;
      participants[index] = {
        ...participants[index],
        ...data,
      } as Participant;
      return tournament;
    });
  };

  const handleDelete = () => {
    setNewTournament((prev) => {
      const newTournament = { ...prev };
      newTournament.participants.list.splice(index, 1);
      return newTournament;
    });
  };

  const data = newTournament.participants.list[index]!;

  return (
    <div className="flex h-full w-full gap-2">
      {newTournament.participants.min &&
        newTournament.participants.min !== newTournament.participants.max && (
          <button
            className="w-5 disabled:opacity-25 disabled:grayscale"
            disabled={
              !newTournament.participants.min ||
              index < newTournament.participants.min
            }
            onClick={handleDelete}
            type="button"
          >
            <FiTrash2 className="stroke-red-500" />
          </button>
        )}
      <span className="flex w-5 items-center justify-center text-xs">
        {index + 1}
      </span>
      <Input
        className="h-full min-w-0 flex-1"
        error={data.name?.trim().length < 1}
        onChange={(e) => handleChange({ name: e.target.value })}
        type="text"
        value={data.name}
      />
      <Input
        className="h-full min-w-0 flex-1"
        error={data.team?.trim().length < 1}
        onChange={(e) => handleChange({ team: e.target.value })}
        type="text"
        value={data.team}
      />
      <div className="h-full w-14 flex-shrink-0">
        <NationalityBadgeSelector
          onChange={(e) => handleChange({ country: e })}
          error={data.country_id === undefined}
          value={data.country_id}
        />
      </div>
    </div>
  );
}

export default ParticipantsListItem;
