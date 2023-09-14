import { useEffect, useState } from "react";
import { Button, Modal, Switch } from "@futshi/js_toolbox";

import useAxios from "~src/hooks/useAxios";
import ActionList from "~src/components/ActionList";
import { FiCheck } from "react-icons/fi";

export default function TournamentSettings() {
  const [pub, setPub] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);

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
    <>
      <ActionList
        items={[
          {
            title: "Access",
            description: pub ? "Public" : "Private",
            onClick: () => setPub((prev) => !prev),
            actionComponent: (
              <Switch className="pointer-events-none" value={pub} />
            ),
          },
          {
            title: "Primary color",
            description: "Select tournament branding colors",
            onClick: () => alert("TODO"),
            actionComponent: (
              <div className="h-8 w-8 rounded border bg-orange-500 pointer-events-none" />
            ),
          },
          {
            title: "Secondary color",
            description: "Select tournament branding colors",
            onClick: () => alert("TODO"),
            actionComponent: (
              <div className="h-8 w-8 rounded border bg-neutral-100 pointer-events-none" />
            ),
          },
          {
            title: "Tournament model",
            description: "Free version",
            actionComponent: (
              <Button onClick={() => setModal(true)}>Change model</Button>
            ),
          },
        ]}
      />

      <Modal show={modal}>
        <div className="flex p-3 gap-3">
          {premiumModels?.map((pm: any, i: number) => (
            <button
              className="break-all flex-1 transition-colors border border-neutral-800 hover:border-transparent disabled:bg-orange-500 hover:bg-neutral-500 rounded"
              disabled={premiumSelection === i}
              key={`premium-model-${i}`}
              onClick={() => setPremiumSelection(i)}
            >
              <div className="flex flex-col gap-4 items-start p-5">
                <p className="font-medium text-lg">{pm.name}</p>
                <p className="text-sm">{pm.description}</p>
                <p className="text-2xl">{Number(pm.price).toFixed(2)} €</p>
                <ul>
                  <li className="flex gap-2 items-center">
                    <FiCheck /> 8 Teams
                  </li>
                  <li className="flex gap-2 items-center">
                    <FiCheck /> Public access
                  </li>
                  <li className="flex gap-2 items-center">
                    <FiCheck /> ...
                  </li>
                </ul>
              </div>
            </button>
          ))}
        </div>
        <Button
          className="bg-neutral-500 dark:bg-neutral-500"
          onClick={() => alert("TODO")}
        >
          Continue
        </Button>
        <Button onClick={() => setModal(false)}>Close</Button>
      </Modal>
    </>
  );
}
