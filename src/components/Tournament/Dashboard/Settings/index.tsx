import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@futshi/js_toolbox";
import FloatingInput from "~src/components/FloatingInput";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import { twMerge } from "tailwind-merge";
type TournamentDashboardSettingsProps = {
  className?: string;
};

export default function TournamentDashboardSettings({
  className,
}: TournamentDashboardSettingsProps) {
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordModalData, setPasswordModalData] = useState<{
    old: string;
    new: string;
    confirm: string;
  }>({
    old: "",
    new: "",
    confirm: "",
  });

  const { tournament } = useGlobalContext();

  const [editTournamentUser, setEditTournamentUser] = useState<{
    username: string;
    email: string;
    verified: boolean;
  }>(tournament.user ?? { username: "", email: "", verified: false });

  const handleInputChange = (data: object) => {
    setEditTournamentUser((prev) => ({ ...prev!, ...data! }));
  };

  return (
    <div className={twMerge("mx-auto max-w-3xl p-3", className)}>
      <button
        className={twMerge(
          "mb-3 inline-flex items-center gap-1 rounded border p-2",
          editTournamentUser?.verified
            ? "border-green-500 bg-green-400"
            : "border-red-500 bg-red-400",
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
        <Button
          className="dark:bg-orange-500 [&:not(:disabled)]:active:bg-orange-600 [&:not(:disabled)]:active:dark:bg-orange-600 active:bg-orange-400 bg-orange-500 dark:border-transparent border-transparent"
          onClick={() => setShowPasswordModal(true)}
        >
          Change password
        </Button>
      </form>

      <Modal show={showPasswordModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("TODO");
          }}
        >
          <ModalHeader className="p-3">Change password</ModalHeader>
          <ModalBody className="flex flex-col gap-3 p-3">
            <FloatingInput
              label="Old password"
              onChange={(e) =>
                setPasswordModalData((prev) => ({
                  ...prev,
                  old: e.target.value,
                }))
              }
              type="password"
              value={passwordModalData.old}
            />
            <FloatingInput
              label="New password"
              onChange={(e) =>
                setPasswordModalData((prev) => ({
                  ...prev,
                  new: e.target.value,
                }))
              }
              type="password"
              value={passwordModalData.new}
            />
            <FloatingInput
              label="Confirm new password"
              onChange={(e) =>
                setPasswordModalData((prev) => ({
                  ...prev,
                  confirm: e.target.value,
                }))
              }
              type="password"
              value={passwordModalData.confirm}
            />
          </ModalBody>
          <ModalFooter className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
