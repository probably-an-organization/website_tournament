import { useEffect, useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { Card } from "@futshi/js_toolbox";

import { useTournamentContext } from "~src/hooks/context/tournament/useTournamentContext";
import FloatingInput from "~src/components/FloatingInput";
import {
  NotificationType,
  useNotificationContext,
} from "~src/hooks/context/useNotificationContext";
import { twMerge } from "tailwind-merge";
const MAX_CHARACTERS = 256;

const MAX_LOGO_FILE_SIZE_BYTES = 3145728; // 3 MB

const readURL = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target?.result as string);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};

export default function NewTournamentGeneral() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const { setNewTournament, newTournament } = useTournamentContext();
  const notification = useNotificationContext();

  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleLogo = async () => {
      setLogoUrl(newTournament.logo ? await readURL(newTournament.logo) : null);
    };

    handleLogo();
  }, [newTournament.logo]);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = logoInputRef.current?.files?.[0];
    if (file) {
      if (file.size > MAX_LOGO_FILE_SIZE_BYTES) {
        notification({
          title: "Error",
          description: "File too large (max. 3 MB)",
          type: NotificationType.Error,
        });
      }
    }
    setNewTournament((prev) => ({
      ...prev,
      logo: file && file.size <= MAX_LOGO_FILE_SIZE_BYTES ? file : undefined,
    }));

    e.target.value = ""; // reset input
  };

  const handleRemoveLogo = () => {
    setNewTournament((prev) => ({ ...prev, logo: undefined }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <Card className="flex flex-col gap-3 p-3">
        <span>General information</span>
        <div className="flex gap-3">
          <div className="group relative flex-1 overflow-hidden rounded">
            {logoUrl && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-colorsOpacity group-hover:bg-black group-hover:bg-opacity-50 group-hover:opacity-100">
                <FiX className="stroke-neutral-50" />
              </div>
            )}
            <button
              className={twMerge(
                "absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded border bg-neutral-950 transition-colors hover:bg-neutral-900",
                logoUrl ? "border-transparent" : "border-b-neutral-50",
              )}
              onClick={() =>
                logoUrl ? handleRemoveLogo() : logoInputRef.current?.click()
              }
            >
              {logoUrl ? (
                <img className="h-full w-full object-fill" src={logoUrl} />
              ) : (
                <>
                  <FiCamera />
                  <span className="mt-1 text-xs">Upload logo</span>
                </>
              )}
            </button>
            <input
              className="hidden"
              accept="image/*"
              // multiple
              type="file"
              ref={logoInputRef}
              onInput={handleLogoChange}
            />
          </div>
          <div className="flex flex-[2] flex-col gap-3">
            <FloatingInput
              label="Tournament name"
              labelAlwaysTop
              onChange={(e) =>
                setNewTournament((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={newTournament.name}
            />
            <FloatingInput
              label={`Description (${
                MAX_CHARACTERS - newTournament.description.length
              } left)`}
              labelAlwaysTop
              onChange={(e) =>
                setNewTournament((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              type="textarea"
              rows={5}
              value={newTournament.description}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
