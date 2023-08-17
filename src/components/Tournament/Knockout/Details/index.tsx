import { useEffect, useState } from "react";
import { FiEye, FiMap, FiMaximize, FiUsers, FiX } from "react-icons/fi";
import {
  PiTreeStructureBold,
  PiTelevisionBold,
  PiWifiXBold,
  PiWifiSlashBold,
  PiWifiHighBold,
} from "react-icons/pi";
import { twMerge } from "tailwind-merge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~src/components/Popover";
import { useKnockoutTournamentContext } from "~src/hooks/context/tournament/useKnockoutTournamentContext";
import KnockoutSVGTree, { TREE_STYLES, TreeStyles } from "./SVGTree";
import useSocket from "~src/hooks/useSocket";
import {
  NotificationType,
  useNotificationContext,
} from "~src/hooks/context/useNotificationContext";
import { KnockoutMatch, KnockoutTournament } from "~src/types/tournament";
import KnockoutMatchInfo from "./MatchInfo";

type KnockoutSVGTreeProps = {
  className?: string;
};

enum KnockoutSlides {
  Tree = "Slides.Tree",
  Match = "Slides.Match",
}

type KnockoutSlide = {
  value: KnockoutSlides;
  label: string;
  icon: React.ReactElement;
  editPermissionsRequired: boolean; // true = slide is only accessible via edit permissions
};

const KNOCKOUT_SLIDES: KnockoutSlide[] = [
  {
    value: KnockoutSlides.Tree,
    label: "Tree",
    icon: <PiTreeStructureBold />,
    editPermissionsRequired: false,
  },
  {
    value: KnockoutSlides.Match,
    label: "Match",
    icon: <PiTelevisionBold />,
    editPermissionsRequired: true,
  },
];

export default function KnockoutDetails({ className }: KnockoutSVGTreeProps) {
  const [showTreeStyleSelection, setShowTreeStyleSelection] =
    useState<boolean>(false);
  const [showSlideSelection, setShowSlideSelection] = useState<boolean>(false);

  const [broadcast, setBroadcast] = useState<boolean>(false);
  const [socketConnecting, setSocketConnecting] = useState<boolean>(false);
  const [slide, setSlide] = useState<KnockoutSlides>(KnockoutSlides.Tree);
  const [treeStyle, setTreeStyle] = useState<TreeStyles>(TreeStyles.Top);

  const {
    fetchKnockout,
    knockoutEditPermission,
    knockoutMatch,
    knockoutTournament,
    setKnockoutMatch,
    setKnockoutTournament,
  } = useKnockoutTournamentContext();

  if (knockoutTournament === null) {
    throw Error("Knockout tournament is null");
  }

  const notification = useNotificationContext();
  const [socket, error] = useSocket(
    `/knockout-tournament-${knockoutTournament._id}`,
    {
      autoConnect: false,
      onConnect: () => setSocketConnecting(false),
      onDisconnect: () => setSocketConnecting(false),
      onError: () => {
        setSocketConnecting(false);
      },
    },
  );

  useEffect(() => {
    socket.on(
      "broadcast-match",
      (data: { stageIndex: number; matchIndex: number }) => {
        setKnockoutMatch(
          knockoutTournament.sortedMatches[data.stageIndex]![data.matchIndex]!,
        );
      },
    );

    socket.on("tournament-update", (data: any) => {
      // typescript can't check if data matches KnockoutMatch on compiling
      // maybe find some other way to do this...
      const typeConvertedMatches: KnockoutMatch[] = data.map(
        (d: KnockoutMatch) => ({
          ...d,
          _id: Number(d._id),
          match_number: Number(d.match_number),
          participant_1_id: Number(d.participant_1_id),
          participant_2_id: Number(d.participant_2_id),
          stage_number: Number(d.stage_number),
          winner: Number(d.winner),
        }),
      );

      if (knockoutMatch) {
        for (const match of typeConvertedMatches) {
          if (match._id === knockoutMatch._id) {
            setKnockoutMatch({ ...match });
          }
        }
      }

      setKnockoutTournament((prev) => {
        const newKnockoutTournament = { ...prev };
        newKnockoutTournament.sortedMatches!.forEach((stage, sIndex) =>
          stage.forEach((match, mIndex) => {
            const newMatch = typeConvertedMatches.find(
              (newMatch) => newMatch._id === match._id,
            );
            if (newMatch) {
              newKnockoutTournament.sortedMatches![sIndex]![mIndex] = newMatch;
            }
          }),
        );
        return newKnockoutTournament as KnockoutTournament;
      });
    });

    socket.on("error", (msg: string) => {
      notification({
        title: "Error",
        description: msg,
        type: NotificationType.Error,
      });
    });
  }, [knockoutTournament, knockoutMatch]);

  useEffect(() => {
    if (broadcast) {
      setSocketConnecting(true);
      fetchKnockout();
      socket.connect();
      socket.send("hello world");
    } else {
      socket.disconnect();
    }
  }, [broadcast]);

  const handleTreeStyleSelection = (newStyle: TreeStyles) => {
    setTreeStyle(newStyle);
    setShowTreeStyleSelection(false);
  };

  const handleSlideSelection = (newSlide: KnockoutSlides) => {
    setSlide(newSlide);
    setShowSlideSelection(false);
  };

  return (
    <div className={twMerge("h-full w-full", className)}>
      <div className="relative mb-3 flex items-center justify-between gap-8 border-b pb-3 dark:border-b-neutral-600">
        <div className="flex items-center gap-4">
          <div className="font-bold">{knockoutTournament.name}</div>
          <div className="flex items-center gap-1 rounded">
            <FiUsers /> <FiX size={10} />
            {knockoutTournament.participants.length}
          </div>
        </div>

        <div className="sticky right-3 flex items-center gap-3">
          <button onClick={() => document.body.requestFullscreen()}>
            <FiMaximize />
          </button>

          {knockoutEditPermission && (
            <button onClick={() => setBroadcast((prev) => !prev)}>
              {broadcast ? (
                socketConnecting ? (
                  <PiWifiHighBold className="animate-pulse" />
                ) : error ? (
                  <PiWifiXBold className="fill-red-500" />
                ) : (
                  <PiWifiHighBold className="fill-orange-500" />
                )
              ) : (
                <PiWifiSlashBold className="fill-neutral-500" />
              )}
            </button>
          )}

          {slide === KnockoutSlides.Tree && (
            <Popover
              open={showTreeStyleSelection}
              onOpenChange={setShowTreeStyleSelection}
            >
              <PopoverTrigger
                onClick={() => setShowTreeStyleSelection((prev) => !prev)}
              >
                <FiEye />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col overflow-hidden rounded dark:bg-neutral-950">
                  {TREE_STYLES.map((t, i) => (
                    <button
                      className={twMerge(
                        "flex items-center gap-2 px-3 py-1.5 hover:dark:bg-neutral-700",
                        treeStyle === t.value
                          ? "pointer-events-none dark:bg-neutral-800"
                          : "",
                      )}
                      key={`tree-style-selection-${i}`}
                      onClick={() => handleTreeStyleSelection(t.value)}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Popover
            open={showSlideSelection}
            onOpenChange={setShowSlideSelection}
          >
            <PopoverTrigger
              onClick={() => setShowSlideSelection((prev) => !prev)}
            >
              <FiMap />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col overflow-hidden rounded dark:bg-neutral-950">
                {KNOCKOUT_SLIDES.filter(
                  (s) => !s.editPermissionsRequired || knockoutEditPermission,
                ).map((t, i) => (
                  <button
                    className={twMerge(
                      "flex items-center gap-2 px-3 py-1.5 hover:dark:bg-neutral-700",
                      slide === t.value
                        ? "pointer-events-none dark:bg-neutral-800"
                        : "",
                    )}
                    key={`tree-style-selection-${i}`}
                    onClick={() => handleSlideSelection(t.value)}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {slide === KnockoutSlides.Match && <KnockoutMatchInfo />}
      {slide === KnockoutSlides.Tree && (
        <KnockoutSVGTree treeStyle={treeStyle} />
      )}
    </div>
  );
}
