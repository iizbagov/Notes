import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "./components/Context";
import { ThemesEnum } from "./components/types/enums";

export const useDarkMode = () => {
  const context = useContext(AppContext);
  const [themeState, setThemeState] = useState<
    ThemesEnum.light | ThemesEnum.dark
  >(ThemesEnum.light);

  const changeTheme = useCallback(
    (theme: ThemesEnum.light | ThemesEnum.dark) => {
      setThemeState(theme);
    },
    [setThemeState]
  );
  const toggleTheme = () => {
    themeState === ThemesEnum.light
      ? changeTheme(ThemesEnum.dark)
      : changeTheme(ThemesEnum.light);
    context.themeChanger(
      context.themeState === ThemesEnum.light
        ? ThemesEnum.dark
        : ThemesEnum.light
    );
  };

  useEffect(() => {
    const localTheme = context.themeState;
    localTheme && setThemeState(localTheme);
  }, []);

  return [themeState, toggleTheme];
};
