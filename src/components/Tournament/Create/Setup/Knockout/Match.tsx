import { useState } from "react";
import {
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { FiAward, FiInfo } from "react-icons/fi";

import { Button, Modal } from "@futshi/js_toolbox";
import Input from "~src/components/Input";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

import type { NewKnockoutMatch } from "~src/types/tournament";

import NationalityBadge from "../../../NationalityBadge";

type KnockoutTournamentMatchProps = {
  match: NewKnockoutMatch;
  onChange(match: NewKnockoutMatch): void;
};

export default function KnockoutTournamentMatch({
  match,
  onChange,
}: KnockoutTournamentMatchProps) {
  const [editKnockoutBranch, setEditKnockoutBranch] =
    useState<NewKnockoutMatch | null>(null);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(5), flip(), shift()],
    open: showInfo,
    onOpenChange: setShowInfo,
  });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const handleEditKnockoutBranchSubmit = () => {
    if (!editKnockoutBranch) {
      return;
    }
    onChange(editKnockoutBranch);
    setEditKnockoutBranch(null);
  };

  return (
    <>
      <button
        className={twMerge(
          "group w-40 flex items-center gap-2 rounded bg-neutral-200 p-2 transition-colorsOpacity dark:bg-neutral-700",
          match.participants.every((p) => !Boolean(p)) ? "opacity-50" : "",
        )}
        onClick={() => setEditKnockoutBranch(match)}
        disabled={match.participants.some((p) => !Boolean(p))}
      >
        <div className="flex flex-1 flex-col gap-2">
          {match.participants.map((p, i) => (
            <div
              className={twMerge(
                "rounded bg-neutral-500 p-2 text-center text-xs transition-colors",
                p ? "" : "italic text-neutral-800",
                match.winner === undefined
                  ? "bg-neutral-500"
                  : match.winner === i
                  ? "bg-orange-500"
                  : "bg-neutral-800",
              )}
              key={`participant-${i}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1">
                    <span className={p?.name ? "font-bold" : ""}>
                      {p?.name || "-"}
                    </span>
                    {match.winner === i ? <FiAward /> : ""}
                  </div>
                  <span>{p?.team || "-"}</span>
                </div>
                <div className="h-6 w-8">
                  <NationalityBadge country={p?.country_id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="group-disabled:pointer-events-none"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <FiInfo />
        </div>
      </button>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="z-30 rounded bg-neutral-900 p-2"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {match.information || "No information"}
          </motion.div>
        )}
      </AnimatePresence>

      <Modal show={!!editKnockoutBranch}>
        <div className="flex flex-col gap-3 p-3">
          <div>
            <label>Select winner</label>
            <div className="flex flex-col gap-3">
              {editKnockoutBranch?.participants.map((p, i) => (
                <button
                  className={twMerge(
                    "flex items-center justify-between rounded p-3 transition-colors",
                    editKnockoutBranch.winner === undefined
                      ? "bg-neutral-500"
                      : editKnockoutBranch.winner === i
                      ? "bg-orange-500"
                      : "bg-neutral-800",
                  )}
                  key={`branch-selector-${i}`}
                  onClick={() =>
                    setEditKnockoutBranch(
                      (prev) => ({ ...prev, winner: i }) as NewKnockoutMatch,
                    )
                  }
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-1 font-bold">
                        <span>{p?.name}</span>
                        {editKnockoutBranch.winner === i ? <FiAward /> : ""}
                      </div>
                      <span className="text-xs">{p?.team}</span>
                    </div>
                    <div className="h-8 w-10">
                      <NationalityBadge country={p?.country_id} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label>Information</label>
            <Input
              className="w-full"
              onChange={(e) =>
                setEditKnockoutBranch(
                  (prev) =>
                    ({
                      ...prev,
                      information: e.target.value,
                    }) as NewKnockoutMatch,
                )
              }
              value={editKnockoutBranch?.information || ""}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setEditKnockoutBranch(null)}>Cancel</Button>
            <Button onClick={handleEditKnockoutBranchSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
