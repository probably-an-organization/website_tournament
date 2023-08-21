import { useEffect, useState } from "react";

import { Button, Card, Modal, Switch } from "@futshi/js_toolbox";
import { useKnockoutTournamentContext } from "~src/hooks/context/tournament/useKnockoutTournamentContext";
import useAxios from "~src/hooks/useAxios";
import { twMerge } from "tailwind-merge";

const SETTING_CLASSNAME = "border-b dark:border-b-neutral-700 last:border-b-0";

export default function TournamentKnockoutSettings() {
  const [pub, setPub] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);

  const { knockoutTournament } = useKnockoutTournamentContext();
  const [premiumSelection, setPremiumSelection] = useState<number>(-1);
  const [premiumModels, setPremiumModels] = useState<any>();
  const { get } = useAxios();

  useEffect(() => {
    console.log("PREMIUM MODELS", premiumModels);
  }, [premiumModels]);

  useEffect(() => {
    const fetch = async () => {
      const result = await get("/premium/models");
      setPremiumModels(result.data);
    };

    fetch();
  }, []);

  return (
    <Card className="overflow-hidden p-0 flex flex-col">
      <button
        className={twMerge(
          SETTING_CLASSNAME,
          "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
        )}
        onClick={() => setPub((prev) => !prev)}
      >
        <div className="flex flex-col items-start">
          <span>Access</span>
          <span className="text-sm text-neutral-400">
            {pub ? "Public" : "Private"}
          </span>
        </div>
        <Switch className="pointer-events-none" value={pub} />
      </button>

      <button
        className={twMerge(
          SETTING_CLASSNAME,
          "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
        )}
        onClick={() => setPub((prev) => !prev)}
      >
        <div className="flex flex-col items-start">
          <span>Primary color</span>
          <span className="text-sm text-neutral-400">
            Select tournament branding colors
          </span>
        </div>
        <div className="h-8 w-8 rounded border bg-orange-500 pointer-events-none" />
      </button>

      <button
        className={twMerge(
          SETTING_CLASSNAME,
          "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
        )}
        onClick={() => setPub((prev) => !prev)}
      >
        <div className="flex flex-col items-start">
          <span>Secondary color</span>
          <span className="text-sm text-neutral-400">
            Select tournament branding colors
          </span>
        </div>
        <div className="h-8 w-8 rounded border bg-neutral-100 pointer-events-none" />
      </button>

      <button
        className={twMerge(
          SETTING_CLASSNAME,
          "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
        )}
        onClick={() => setModal(true)}
      >
        <div className="flex flex-col items-start">
          <span>Tournament model</span>
          <span className="text-sm text-neutral-400">Free version</span>
        </div>
        <Button className="pointer-events-none">Change model</Button>
      </button>

      <Modal show={modal}>
        <div className="flex p-3 gap-3">
          {premiumModels?.map((pm: any, i: number) => (
            <button
              className="break-all flex-1 transition-colors border border-neutral-800 hover:border-transparent disabled:bg-neutral-500 hover:bg-neutral-500 rounded p-3"
              disabled={premiumSelection === i}
              key={`premium-model-${i}`}
              onClick={() => setPremiumSelection(i)}
            >
              <div className="text-center font-medium">{pm.name}</div>
              <div className="text-center text-sm">{pm.description}</div>
              <div>{Number(pm.price).toFixed(2)}</div>
            </button>
          ))}
        </div>
        <Button onClick={() => setModal(false)}>Close</Button>
      </Modal>
    </Card>
  );
}
