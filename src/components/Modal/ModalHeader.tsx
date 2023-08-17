import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
export type ModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
  closeButton?: boolean;
  onClose?(): void;
};

export default function ModalHeader({
  children,
  className,
  closeButton,
  onClose,
}: ModalHeaderProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded-t border-b border-neutral-300 p-5 dark:border-neutral-600",
        className,
      )}
    >
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-50">
        {children}
      </h3>
      {closeButton && (
        <button
          className="float-right border-0 bg-transparent text-black"
          onClick={onClose}
        >
          <FiX />
        </button>
      )}
    </div>
  );
}
