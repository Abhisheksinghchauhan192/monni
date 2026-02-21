import { createContext, useState, useContext, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => {
      if (prev.some((t) => t.message === message)) return prev;

      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
      ></ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    console.error("useToast must be used within the ToastProvider");
  }
  return context;
}
