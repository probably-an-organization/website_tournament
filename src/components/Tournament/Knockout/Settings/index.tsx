import { useEffect, useState } from "react";

import Button from "~src/components/Button";
import Modal from "~src/components/Modal";
import Switch from "~src/components/Switch";
import useAxios from "~src/hooks/useAxios";

export default function TournamentKnockoutSettings() {
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
      <div>
        <div className="flex items-center gap-2">
          <span>Private</span>
          <Switch value={pub} onChange={() => setPub((prev) => !prev)} />
          <span>Public</span>
        </div>
        <div>Colors</div>
        <div>Logo</div>
        <div>Background image</div>

        <Button onClick={() => setModal(true)}>ASDF</Button>
      </div>
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
    </>
  );
}
