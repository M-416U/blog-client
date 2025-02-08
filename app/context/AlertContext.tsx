import { createContext, useContext, useState } from "react";
import { Alert } from "../components/ui/Alert";

type AlertType = "error" | "success" | "warning" | "info";

interface AlertItem {
  id: string;
  message: string;
  type: AlertType;
}

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = (message: string, type: AlertType) => {
    const id = Math.random().toString(36).substring(7);
    const newAlert = { id, message, type };

    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed z-50 flex flex-col gap-2 bottom-4 right-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            position="bottom-right"
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
