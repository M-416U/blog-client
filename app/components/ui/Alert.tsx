import { cn } from "@/app/lib/utils";
import {
  BiError,
  BiCheck,
  BiInfoCircle,
  BiMessageAltError,
} from "react-icons/bi";

type AlertType = "error" | "success" | "warning" | "info";
type AlertPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface AlertProps {
  message: string;
  type: AlertType;
  position?: AlertPosition;
  className?: string;
}

const icons = {
  error: BiError,
  success: BiCheck,
  warning: BiMessageAltError,
  info: BiInfoCircle,
};

const styles = {
  error: "border-red-200",
  success: "border-green-200",
  warning: "border-yellow-200",
  info: "border-blue-200",
};

const positions = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export function Alert({
  message,
  type,
  position = "bottom-right",
  className,
}: AlertProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4 border rounded-lg text-text-light dark:text-text-dark bg-accent-light dark:bg-accent-dark shadow-lg animate-slide-in",
        styles[type],
        positions[position],
        className
      )}
    >
      <Icon size={20} />
      <p>{message}</p>
    </div>
  );
}
