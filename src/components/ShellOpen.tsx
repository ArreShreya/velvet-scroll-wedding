import { createContext, useContext } from "react";

/**
 * True once the scroll has finished unfurling. Scroll-triggered reveals wait
 * for this so animations don't play behind the closed landing screen.
 * Defaults to true so components used outside the shell still animate.
 */
export const ShellOpenContext = createContext(true);

export const useShellOpen = () => useContext(ShellOpenContext);
