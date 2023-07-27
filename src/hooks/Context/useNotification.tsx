"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { lerp } from "~/utils/mathUtils";
import { styled } from "~/utils/stringUtils";
import { FiX } from "react-icons/fi";

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

/* CONTEXT */
export type NotificationContextProps = (data: NotificationProps) => void;

export const NotificationContext = createContext<NotificationContextProps>(
  () => undefined
);

/* HOOK */
export const useNotification = () => useContext(NotificationContext);

/* CONTEXT PROVIDER */
export type NotificationContextProviderProps = {
  children: React.ReactNode;
};

export function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

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

  const notification = ({
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
    if (!duration || !Number.isFinite(duration)) {
      setTimeout(() => removeNotification(id), DEFAULT_NOTIFICATION_LIFESPAN);
    }
  };

  const removeNotification = (id?: string) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={notification}>
      {children}

      <AnimatePresence>
        {notifications?.length > 0 && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed bottom-3 right-3 z-50 flex flex-col-reverse gap-1.5"
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
                        "flex w-40 flex-col gap-1.5 rounded p-1.5 text-xs text-neutral-50",
                        getNotificationColor(n.type)
                      )}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key={`notification-${i}`}
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{n.title}</span>
                        <button onClick={() => removeNotification(n.id)}>
                          <FiX />
                        </button>
                      </div>
                      <span>{n.description}</span>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}
