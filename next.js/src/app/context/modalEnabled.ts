import { createContext } from "react";
export type modalContextType = {
    modalState: boolean;
    setModalState: (v: boolean) => void;
};
export const modalEnabledContext = createContext<modalContextType>({
    modalState: false,
    setModalState: () => undefined,
});
