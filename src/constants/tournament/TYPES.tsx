import GroupSettings from "~src/components/Tournament/Create/Type/Group";
import KnockoutSettings from "~src/components/Tournament/Create/Type/Knockout";
import PreselectionSettings from "~src/components/Tournament/Create/Type/Preselection";
import SwissSettings from "~src/components/Tournament/Create/Type/Swiss";
import KnockoutTournament from "~src/components/Tournament/Create/Type/Knockout";
import PreselectionTournament from "~src/components/Tournament/Create/Type/Preselection";

export enum TournamentType {
  Group = "TournamentType.Group",
  Preselection = "TournamentType.Preselection",
  Swiss = "TournamentType.Swiss",
  Knockout = "TournamentType.Knockout",
}

export const TournamentTypes = [
  {
    active: false,
    components: {
      settings: <GroupSettings />,
      //tournament: <GroupTournament />,
    },
    databaseType: "group_stage",
    label: "Group",
    shortLabel: "Group",
    value: TournamentType.Group,
  },
  {
    active: false,
    components: {
      settings: <PreselectionSettings />,
      tournament: <PreselectionTournament />,
    },
    databaseType: "preselection",
    label: "Preselection",
    shortLabel: "Pre",
    value: TournamentType.Preselection,
  },
  {
    active: false,
    components: {
      settings: <SwissSettings />,
      //tournament: <SwissTournament />,
    },
    databaseType: "swiss_system",
    label: "Swiss System",
    shortLabel: "Swiss",
    value: TournamentType.Swiss,
  },
  {
    active: true,
    components: {
      settings: <KnockoutSettings />,
      tournament: <KnockoutTournament />,
    },
    databaseType: "knockout",
    label: "Knockout",
    shortLabel: "KO",
    value: TournamentType.Knockout,
  },
];
