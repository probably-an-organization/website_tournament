import { useLayoutEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiActivity, FiAlertCircle, FiSettings, FiUsers } from "react-icons/fi";

import {
  NotificationType,
  TournamentContextProvider,
  useTournamentContext,
} from "../../hooks/useTournamentContext";
import Breadcrumb, { type BreadcrumbItem } from "../Breadcrumb";
import NewTournamentParticipant from "./Participants";
import { Hover, HoverContent, HoverTrigger } from "~/components/Hover";
import NewTournamentGeneral from "./General";
import Button from "~/components/Button";
import NewTournamentType from "./Type";
import NewTournamentSetup from "./Setup";
import useAxios from "~/hooks/useAxios";
import { useNotification } from "~/hooks/Context/useNotification";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { TournamentTypes } from "../../constants/TYPES";

export default function NewTournament() {
  return (
    <TournamentContextProvider>
      <NewTournamentComponent />
    </TournamentContextProvider>
  );
}

function NewTournamentComponent() {
  const [slide, setSlide] = useState<number>(0);

  const { newTournament } = useTournamentContext();
  const notification = useNotification();
  const router = useRouter();
  const { get, post } = useAxios();

  useLayoutEffect(() => {
    const checkUserAlreadyLoggedIn = async () => {
      await get("/login-verification", {
        withCredentials: true,
      });
    };
    checkUserAlreadyLoggedIn().catch(
      async () => await router.push("/tournament/login"),
    );
  }, []);

  const BREADCRUMBS: BreadcrumbItem[] = [
    // TODO better disabled logic (wip)
    {
      disabled: slide !== 0 && slide < 1,
      icon: <FiSettings />,
      label: "General",
      onClick: () => setSlide(0),
      value: 0,
    },
    {
      disabled: slide !== 1 && slide < 2,
      icon: <FiActivity />,
      label: "Tournament",
      onClick: () => setSlide(1),
      value: 1,
    },
    {
      disabled: slide !== 2 && slide < 3,
      icon: <FiSettings />,
      label:
        (TournamentTypes.find((t) => t.value === newTournament.type)?.label ??
          "Tournament") + " settings",
      onClick: () => setSlide(2),
      value: 2,
    },
    {
      disabled: slide !== 3 && slide < 4,
      icon: <FiUsers />,
      label: "Participants",
      onClick: () => setSlide(3),
      value: 3,
    },
  ];

  const getLineups = () => {
    const participants = newTournament.participants.list.slice(
      0,
      newTournament.participants.show,
    );
    let stageMatchCount = Math.ceil(participants.length / 2);
    const newLineups = [];
    newLineups.push(
      Array.from({ length: stageMatchCount }, (_, i) => [i * 2, i * 2 + 1]),
    );
    while (stageMatchCount !== 1) {
      stageMatchCount /= 2;
      newLineups.push(
        Array.from({ length: stageMatchCount }, (_, i) => [null, null]),
      );
    }
    return newLineups as [number | null, number | null][][];
  };

  const handleSubmitTournament = async () => {
    try {
      await post(
        "/knockout-create",
        {
          ...newTournament,
          participants: newTournament.participants.list.slice(
            0,
            newTournament.participants.show,
          ),
          lineups: getLineups()[0],
          type: TournamentTypes.find((t) => t.value === newTournament.type)
            ?.databaseType,
        },
        { withCredentials: true },
      );
      notification({
        title: "ASDF",
        description: "OLAF",
        type: NotificationType.Success,
      });
      await router.push("/tournament/dashboard");
    } catch (err) {
      notification({
        title: "Error",
        description: (err as AxiosError).message,
        type: NotificationType.Error,
      });
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col gap-3 overflow-auto p-3">
      <div className="ml-16">
        <Breadcrumb items={BREADCRUMBS} active={slide} /* TODO items={[]} */ />
      </div>

      <div className="sticky left-0 flex flex-1 items-center">
        <AnimatePresence initial mode="wait">
          {slide === 0 && <NewTournamentGeneral />}
          {slide === 1 && <NewTournamentType />}
          {slide === 2 && <NewTournamentSetup />}
          {slide === 3 && <NewTournamentParticipant />}
        </AnimatePresence>
      </div>

      <div className="sticky left-0 flex justify-between">
        <Button
          onClick={() =>
            slide <= 0
              ? void (async () => await router.push("/tournament/dashboard"))()
              : setSlide((prev) => Math.max(0, prev - 1))
          }
        >
          {slide <= 0 ? "Return to dashboard" : "Back"}
        </Button>
        <Button
          // disabled={slide >= BREADCRUMBS.length - 1}
          onClick={() =>
            slide >= BREADCRUMBS.length - 1
              ? handleSubmitTournament()
              : setSlide((prev) => prev + 1)
          }
        >
          {slide >= BREADCRUMBS.length - 1 ? "Create tournament" : "Next"}
        </Button>
      </div>

      <Hover>
        <HoverTrigger className="fixed bottom-20 left-3">
          <FiAlertCircle className="rotate-180" />
        </HoverTrigger>
        <HoverContent className="rounded bg-black bg-opacity-75 p-2 backdrop-blur">
          <div>
            <span>{newTournament.type}</span>
          </div>
          <div>
            <div>Participants</div>
            <div>{newTournament.participants.list.length}</div>
            <div>min {newTournament.participants.min}</div>
            <div>max {newTournament.participants.max}</div>
            <div>show {newTournament.participants.show}</div>
          </div>
        </HoverContent>
      </Hover>
    </div>
  );
}
