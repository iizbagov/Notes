import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./components/Context";
import { Themes } from "./components/types/enums";
import { themeToggler } from "./store";

export const useDarkMode = () => {
  const context = useContext(AppContext);
  const theme = context.state.theme;
  const dispatch = context.dispatchMiddleware;
  const [themeState, setThemeState] =
    useState<Themes.light | Themes.dark>(theme);

  const changeTheme = useCallback(
    (theme: Themes.light | Themes.dark) => {
      setThemeState(theme);
    },
    [setThemeState]
  );

  const toggleTheme = () => {
    if (themeState === Themes.light) {
      changeTheme(Themes.dark);
      dispatch(themeToggler, Themes.dark);
    } else {
      changeTheme(Themes.light);
      dispatch(themeToggler, Themes.light);
    }
  };

  return [themeState, toggleTheme];
};
