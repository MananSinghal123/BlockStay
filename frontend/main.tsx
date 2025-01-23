import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { CollectionProvider } from "./Contexts/CollectionContext";
import App from "@/App";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";

const queryClient = new QueryClient();

const AppContext = React.createContext({});
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    user: null, // Example context value
    setUser: () => {}, // Example setter for context value
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <CollectionProvider>
    <AppContextProvider>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider delayDuration={100}>

            <App />

            <WrongNetworkAlert />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </WalletProvider>
    </AppContextProvider>
    </CollectionProvider>
  </React.StrictMode>,
);
