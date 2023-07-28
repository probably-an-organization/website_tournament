export const getStageLabel = (
  stage: number,
  participantsCount: number
): string => {
  const stageParticipants = Math.floor(participantsCount / Math.pow(2, stage));
  switch (stageParticipants) {
    case 64:
      return "Top 64";
    case 32:
      return "Top 32";
    case 16:
      return "Top 16";
    case 8:
      return "Quarterfinal";
    case 4:
      return "Semifinal";
    case 2:
      return "Final";
    default:
      return "???";
  }
};
