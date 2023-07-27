import { styled } from "~/utils/stringUtils";
import { Stages } from "./STAGES";
import { FiLayers, FiPlay, FiUsers } from "react-icons/fi";

type NavigationIconProps = {
  className?: string;
};

export type Navigation = {
  icon: ({ className }: NavigationIconProps) => React.ReactElement;
  label: string;
  stage: Stages;
};

const NAVIGATION_ICON_STROKE = "transition-colors stroke-neutral-300";

export const NAVIGATION: Navigation[] = [
  {
    icon: ({ className }) => (
      <FiLayers className={styled(NAVIGATION_ICON_STROKE, className)} />
    ),
    label: "Setup",
    stage: Stages.Setup,
  },
  {
    icon: ({ className }) => (
      <FiUsers className={styled(NAVIGATION_ICON_STROKE, className)} />
    ),
    label: "Participants",
    stage: Stages.Participants,
  },
  {
    icon: ({ className }) => (
      <FiPlay className={styled(NAVIGATION_ICON_STROKE, className)} />
    ),
    label: "Start",
    stage: Stages.Tournament,
  },
];
