// BankContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface BankState {
  // Define your bank account state properties here
  balance: number;
  // Other properties as needed
}

interface BankContextType {
  bankState: BankState | null;
  updateBankState: (newState: BankState) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bankState, setBankState] = useState<BankState | null>(null);

  const updateBankState = (newState: BankState) => {
    setBankState(newState);
  };

  return (
    <BankContext.Provider value={{ bankState, updateBankState }}>
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
