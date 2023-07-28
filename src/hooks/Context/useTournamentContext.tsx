"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { FiX } from "react-icons/fi";

import { styled } from "~src/utils/stringUtils";
import { lerp } from "~src/utils/mathUtils";
import type { NewTournament } from "~src/types/tournament";
import { PARTICIPANTS_LIMIT } from "~src/constants/tournament/PARTICIPANTS";
import { Country } from "~src/constants/tournament/COUNTRIES";
import { getRandom } from "~src/utils/arrayUtils";
import { NAME_LIST } from "~src/constants/DUMMY_DATA";

const DEFAULT_NOTIFICATION_LIFESPAN = 5000;
const NOTIFICATION_LENGTH_OPACITY = 5;

export enum NotificationType {
  Success = 0,
  Warning = 1,
  Error = 2,
}

export type NotificationProps = {
  description: string;
  duration?: number;
  id?: string;
  title: string;
  type: NotificationType;
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.Success:
      return "bg-green-500";
    case NotificationType.Warning:
      return "bg-orange-500";
    case NotificationType.Error:
      return "bg-red-500";
    default:
      return "bg-white";
  }
};

/* CONTEXT */
export type TournamentContextProps = {
  loading: boolean;
  notify(data: NotificationProps): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTournament: React.Dispatch<React.SetStateAction<NewTournament>>;
  newTournament: NewTournament;
};

const TournamentContext = createContext<TournamentContextProps>(
  {} as TournamentContextProps,
);

/* HOOK */
export const useTournamentContext = () => useContext(TournamentContext);

/* CONTEXT PROVIDER */
export type TournamentContextProviderProps = {
  children: React.ReactNode;
};

export const TournamentContextProvider = ({
  children,
}: TournamentContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [newTournament, setNewTournament] = useState<NewTournament>({
    active: false,
    name: "Tournament",
    description: "",
    logo: undefined,
    participants: {
      list: Array.from({ length: PARTICIPANTS_LIMIT }).map((_) => ({
        name: getRandom(NAME_LIST),
        team: (Math.random() + 1).toString(36).substring(7),
        country_id: Country.Austria,
      })),
      max: PARTICIPANTS_LIMIT,
      show: 0,
    },
    type: undefined,
  });

  const notify = ({
    description,
    duration,
    id,
    title,
    type,
  }: NotificationProps) => {
    // TODO limit to certain amount of notifs
    if (!id) {
      id = uuidv4();
    }
    setNotifications([
      ...notifications,
      { description, duration, id, title, type },
    ]);
    if (Number.isFinite(duration)) {
      setTimeout(() => removeNotification(id), DEFAULT_NOTIFICATION_LIFESPAN);
    }
  };

  const removeNotification = (id?: string) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <TournamentContext.Provider
      value={{
        loading,
        newTournament,
        notify,
        setLoading,
        setNewTournament,
      }}
    >
      {children}

      <AnimatePresence>
        {notifications?.length > 0 && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <AnimatePresence>
              {notifications.map(
                (n, i) =>
                  i < NOTIFICATION_LENGTH_OPACITY && (
                    <motion.div
                      animate={{
                        opacity:
                          1 - lerp(0.25, 1, i / NOTIFICATION_LENGTH_OPACITY),
                      }}
                      className={styled(
                        "h-28 rounded text-white",
                        getNotificationColor(n.type),
                      )}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key={`notification-${i}`}
                    >
                      <div className="flex justify-between border-b border-b-white p-2">
                        <div>{n.title}</div>
                        <button onClick={() => removeNotification(n.id)}>
                          <FiX />
                        </button>
                      </div>
                      <div className="p-2">{n.description}</div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </TournamentContext.Provider>
  );
};
