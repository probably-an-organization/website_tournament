import { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@futshi/js_toolbox";
import { FiCamera } from "react-icons/fi";

import FloatingInput from "~src/components/FloatingInput";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import ActionList from "~src/components/ActionList";
import { EditModal } from "~src/constants/tournament/SETTINGS";

type ModalData = {
  username: string;
  email: string;
  password: {
    old: string;
    new: string;
    confirm: string;
  };
};

const DEFAULT_EDIT_MODAL_DATA = {
  username: "",
  email: "",
  password: {
    old: "",
    new: "",
    confirm: "",
  },
};

const DEFAULT_SHOW_EDIT_MODAL = {
  [EditModal.Username]: false,
  [EditModal.Email]: false,
  [EditModal.Password]: false,
  [EditModal.Verification]: false,
};

type TournamentDashboardSettingsProps = {
  className?: string;
};

export default function TournamentDashboardSettings({
  className,
}: TournamentDashboardSettingsProps) {
  const [profileImage, setProfileImage] = useState<File>();
  const [showEditModal, setShowEditModal] = useState<{
    [key in EditModal]?: boolean;
  }>(DEFAULT_SHOW_EDIT_MODAL);
  const [editModalData, setEditModalData] = useState<ModalData>(
    DEFAULT_EDIT_MODAL_DATA,
  );

  const profileImageRef = useRef<HTMLInputElement>(null);

  const { user } = useGlobalContext();

  const showModal = (key: string) => {
    setShowEditModal({ ...DEFAULT_SHOW_EDIT_MODAL, [key]: true });
  };

  const closeModal = () => {
    setShowEditModal(DEFAULT_SHOW_EDIT_MODAL);
  };

  const getModalHeader = () => {
    let header;
    Object.entries(showEditModal).some(([key, value]) => {
      if (value) {
        switch (key) {
          case EditModal.Username:
            header = "Change username";
            break;
          case EditModal.Email:
            header = "Change email";
            break;
          case EditModal.Password:
            header = "Change password";
            break;
          case EditModal.Verification:
            header = "Verification";
            break;
        }
        return;
      }
    });
    return header;
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      {/* TODO image crop modal: https://codesandbox.io/s/q8q1mnr01w */}
      <button
        className="relative group overflow-hidden w-24 h-24 rounded-full self-center"
        onClick={() => profileImageRef.current?.click()}
      >
        <div className="absolute flex items-center justify-center text-xs inset-0 group-hover:opacity-50 bg-black opacity-0 transition-opacity">
          <FiCamera size={30} />
        </div>
        <img
          className="w-full h-full"
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : "/profile_dummy.jpg"
          }
        />
        <input
          onChange={(e) => setProfileImage(e.target.files?.[0])}
          ref={profileImageRef}
          type="file"
        />
      </button>
      <ActionList
        items={[
          {
            title: "Username",
            description: user?.data?.username,
            actionComponent: (
              <Button onClick={() => showModal(EditModal.Username)}>
                Change username
              </Button>
            ),
          },
          {
            title: "Email",
            description: user?.data?.email,
            actionComponent: (
              <Button onClick={() => showModal(EditModal.Email)}>
                Change email
              </Button>
            ),
          },
          {
            title: "Password",
            actionComponent: (
              <Button onClick={() => showModal(EditModal.Password)}>
                Change password
              </Button>
            ),
          },
          {
            title: "Verification",
            description: `Your account is ${
              !user?.data?.verified && "not "
            }verified`,
            actionComponent: (
              <Button onClick={() => showModal(EditModal.Verification)}>
                Verify account
              </Button>
            ),
          },
        ]}
      />

      <Modal show={Object.values(showEditModal).some((entry) => entry)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("TODO");
          }}
        >
          <ModalHeader className="p-3">{getModalHeader()}</ModalHeader>
          <ModalBody className="flex flex-col gap-3 p-3">
            {showEditModal[EditModal.Username] && (
              <FloatingInput
                label="New username"
                labelAlwaysTop
                onChange={(e) =>
                  setEditModalData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                value={editModalData.username}
              />
            )}
            {showEditModal[EditModal.Email] && (
              <FloatingInput
                label="New email"
                labelAlwaysTop
                onChange={(e) =>
                  setEditModalData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                value={editModalData.email}
              />
            )}
            {showEditModal[EditModal.Password] && (
              <>
                <FloatingInput
                  label="Old password"
                  labelAlwaysTop
                  onChange={(e) =>
                    setEditModalData((prev) => ({
                      ...prev,
                      password: { ...prev.password, old: e.target.value },
                    }))
                  }
                  type="password"
                  value={editModalData.password.old}
                />
                <FloatingInput
                  label="New password"
                  labelAlwaysTop
                  onChange={(e) =>
                    setEditModalData((prev) => ({
                      ...prev,
                      password: { ...prev.password, new: e.target.value },
                    }))
                  }
                  type="password"
                  value={editModalData.password.new}
                />
                <FloatingInput
                  label="Confirm new password"
                  labelAlwaysTop
                  onChange={(e) =>
                    setEditModalData((prev) => ({
                      ...prev,
                      password: { ...prev.password, confirm: e.target.value },
                    }))
                  }
                  type="password"
                  value={editModalData.password.confirm}
                />
              </>
            )}
            {showEditModal[EditModal.Verification] && (
              <p>
                Click submit to resend verification (TODO LIST OF BENEFITS OF
                BEING VERIFIED :P)
              </p>
            )}
          </ModalBody>
          <ModalFooter className="flex gap-2">
            <Button className="flex-1" onClick={() => closeModal()}>
              Cancel
            </Button>
            <Button className="flex-1 dark:bg-orange-500" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
