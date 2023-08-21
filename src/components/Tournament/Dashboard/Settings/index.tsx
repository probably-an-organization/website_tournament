import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@futshi/js_toolbox";

import FloatingInput from "~src/components/FloatingInput";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import { twMerge } from "tailwind-merge";

type TournamentDashboardSettingsProps = {
  className?: string;
};

const SETTING_CLASSNAME = "border-b dark:border-b-neutral-700 last:border-b-0";

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
    <>
      <Card className="overflow-hidden p-0 flex flex-col m-3">
        <button
          className={twMerge(
            SETTING_CLASSNAME,
            "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
          )}
          onClick={() => alert("TODO")}
        >
          <div className="flex flex-col items-start">
            <span>Username</span>
            <span className="text-sm text-neutral-400">
              {editTournamentUser.username}
            </span>
          </div>
          <Button className="pointer-events-none">Change username</Button>
        </button>

        <button
          className={twMerge(
            SETTING_CLASSNAME,
            "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
          )}
          onClick={() => alert("TODO")}
        >
          <div className="flex flex-col items-start">
            <span>Email</span>
            <span className="text-sm text-neutral-400">
              {editTournamentUser.email}
            </span>
          </div>
          <Button className="pointer-events-none">Change email</Button>
        </button>

        <button
          className={twMerge(
            SETTING_CLASSNAME,
            "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
          )}
          onClick={() => setShowPasswordModal(true)}
        >
          <div className="flex flex-col items-start">
            <span>Password</span>
          </div>
          <Button className="pointer-events-none">Change password</Button>
        </button>

        <button
          className={twMerge(
            SETTING_CLASSNAME,
            "p-3 items-center w-full flex justify-between transition-colors hover:bg-neutral-800",
          )}
          onClick={() => alert("TODO")}
        >
          <div className="flex flex-col items-start">
            <span>Verificiation</span>
            <span className="text-sm text-neutral-400">
              Your account is {editTournamentUser.verified ? "" : "not"}{" "}
              verified
            </span>
          </div>
          <Button className="pointer-events-none">Verify account</Button>
        </button>
      </Card>

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
    </>
  );
}
