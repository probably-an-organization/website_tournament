import GroupSettings from "../components/NewTournament/Type/Group";
import KnockoutSettings from "../components/NewTournament/Type/Knockout";
import PreselectionSettings from "../components/NewTournament/Type/Preselection";
import SwissSettings from "../components/NewTournament/Type/Swiss";
import KnockoutTournament from "../components/NewTournament/Type/Knockout";
import PreselectionTournament from "../components/NewTournament/Type/Preselection";

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
