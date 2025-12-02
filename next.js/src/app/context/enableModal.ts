import { createContext } from "react";
export type enableModalContextType = {
    active: string;
    setActive: (v: string) => void;
};
export const enableModalContext = createContext<enableModalContextType>({
    active: "none",
    setActive: () => undefined,
});
