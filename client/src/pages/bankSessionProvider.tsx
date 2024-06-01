// BankContext.tsx
import { BankDataInterface } from "@/types/types.main";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface BankContextType {
  bankState: BankDataInterface | null;
  updateBankState: (newState: BankDataInterface) => void;
  bankStateLoading: boolean;
  updateBankStateLoading: (newState: boolean) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bankState, setBankState] = useState<BankDataInterface | null>(null);
  const [bankStateLoading, setBankStateLoading] = useState<boolean>(true);

  const updateBankState = (newState: BankDataInterface) => {
    setBankState(newState);
  };
  const updateBankStateLoading = (newState: boolean) => {
    setBankStateLoading(newState);
  };

  return (
    <BankContext.Provider
      value={{
        bankState,
        updateBankState,
        bankStateLoading,
        updateBankStateLoading,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = (): BankContextType => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
};
