import { SiCounterstrike } from "react-icons/si";
import { FiDribbble, FiHome, FiLogIn, FiMessageCircle } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { TbTournament } from "react-icons/tb";

export type SidebarLink = {
  className?: string;
  href: string;
  icon?: {
    component: React.ReactElement;
    fill?: boolean;
    stroke?: boolean;
  };
  label: string;
  production?: boolean;
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: "/",
    icon: {
      component: <FiHome />,
      fill: false,
      stroke: true,
    },
    label: "Home",
    production: true,
  },
  {
    href: "/csgo",
    icon: {
      component: <SiCounterstrike />,
      fill: true,
      stroke: false,
    },
    label: "CS:GO Team Generator",
    production: true,
  },
  {
    href: "/playground",
    icon: {
      component: <FiDribbble />,
      fill: false,
      stroke: true,
    },
    label: "Playground",
    production: false,
  },
  {
    href: "/chat",
    icon: {
      component: <FiMessageCircle />,
      fill: false,
      stroke: true,
    },
    label: "Chat room",
    production: false,
  },
  {
    href: "/tournament",
    icon: {
      component: <TbTournament />,
      fill: false,
      stroke: true,
    },
    label: "Tournament Generator",
    production: false,
  },
  {
    href: "/chatrobot",
    icon: {
      component: <BsRobot />,
      fill: false,
      stroke: true,
    },
    label: "Chat Robot (WIP)",
    production: true,
  },
  {
    href: "/login",
    icon: {
      component: <FiLogIn />,
      fill: false,
      stroke: true,
    },
    label: "Login (WIP)",
    production: true,
  },
];
