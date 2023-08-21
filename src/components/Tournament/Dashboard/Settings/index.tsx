import { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@futshi/js_toolbox";

import FloatingInput from "~src/components/FloatingInput";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import ActionList from "~src/components/ActionList";

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
    <>
      <ActionList
        className="m-3"
        items={[
          {
            title: "Username",
            description: editTournamentUser.username,
            actionComponent: (
              <Button onClick={() => alert("TODO")}>Change username</Button>
            ),
          },
          {
            title: "Email",
            description: editTournamentUser.email,
            actionComponent: (
              <Button onClick={() => alert("TODO")}>Change email</Button>
            ),
          },
          {
            title: "Password",
            actionComponent: (
              <Button onClick={() => setShowPasswordModal(true)}>
                Change password
              </Button>
            ),
          },
          {
            title: "Verification",
            description: `Your account is ${
              !editTournamentUser.verified && "not "
            }verified`,
            actionComponent: (
              <Button onClick={() => alert("TODO")}>Verify account</Button>
            ),
          },
        ]}
      />

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
