import { useState } from "react";

import Switch from "~/components/Switch";

export default function TournamentKnockoutSettings() {
  const [pub, setPub] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span>Private</span>
        <Switch value={pub} onChange={() => setPub((prev) => !prev)} />
        <span>Public</span>
      </div>
      <div>Colors</div>
      <div>Logo</div>
      <div>Background image</div>
    </div>
  );
}
