import { useLayoutEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import Button from "~/components/Button";
import FloatingInput from "~/components/FloatingInput";
import { useGlobal } from "~/hooks/Context/useGlobal";
import { styled } from "~/utils/stringUtils";

type TournamentDashboardSettingsProps = {
  className?: string;
};

export default function TournamentDashboardSettings({
  className,
}: TournamentDashboardSettingsProps) {
  const { tournament } = useGlobal();

  const [editTournamentUser, setEditTournamentUser] = useState<{
    username: string;
    email: string;
    verified: boolean;
  }>(tournament.user ?? { username: "", email: "", verified: false });

  const handleInputChange = (data: object) => {
    setEditTournamentUser((prev) => ({ ...prev!, ...data! }));
  };

  return (
    <div className={styled("mx-auto max-w-3xl", className)}>
      <button
        className={styled(
          "mb-3 inline-flex items-center gap-1 rounded border p-2",
          editTournamentUser?.verified
            ? "border-green-500 bg-green-400"
            : "border-red-500 bg-red-400"
        )}
        onClick={() => alert("TODO verification email")}
      >
        {editTournamentUser?.verified ? <FiCheck /> : <FiX />}
        <span>{editTournamentUser?.verified ? "Verified" : "Unverified"}</span>
      </button>
      <form className="flex flex-col gap-3">
        <FloatingInput
          label="Username"
          labelAlwaysTop
          onChange={(e) => handleInputChange({ username: e.target.value })}
          value={editTournamentUser?.username}
        />
        <FloatingInput
          label="Email (TODO check pattern)"
          labelAlwaysTop
          onChange={(e) => handleInputChange({ email: e.target.value })}
          value={editTournamentUser?.email}
        />
        <Button>Change password</Button>
      </form>
    </div>
  );
}
