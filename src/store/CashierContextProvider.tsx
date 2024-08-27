import { createContext, useEffect, useState } from "react";
import { ICashier } from "../pages/SelectCashier/SelectCashier";
import { useNavigate } from "react-router-dom";

interface IState {
  cashier: ICashier;
  setCashier: (cashier: ICashier) => void;
}

const initialState: IState = {
  cashier: {} as ICashier,
  setCashier: () => { }
}

export const CashierContext = createContext(initialState)

export const CashierContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [cashier, setRawData] = useState<ICashier>(initialState.cashier);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cashier.id) {
      navigate('/');
    }
  }, [cashier.id, navigate])

  const setCashier = (cashier: ICashier) => {
    setRawData(cashier)
  }

  return (
    <CashierContext.Provider value={{ cashier, setCashier }}>
      {children}
    </CashierContext.Provider>
  );
}

