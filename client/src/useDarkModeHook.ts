import { useContext, useEffect, useState } from "react";
import { AppContext } from "./components/Context";
import { Themes } from "./components/types/enums";
import { themeToggler } from "./store";

export const useDarkMode = () => {
  const context = useContext(AppContext);
  const dispatch = context.dispatchMiddleware;
  const [theme, setTheme] = useState(Themes.light);
  const toggleTheme = () => {
    if (theme === Themes.light) {
      dispatch(themeToggler, Themes.dark);
      window.localStorage.setItem("theme", Themes.dark);
      setTheme(Themes.dark);
    } else {
      dispatch(themeToggler, Themes.light);
      window.localStorage.setItem("theme", Themes.light);
      setTheme(Themes.light);
    }
  };

  useEffect(() => {
    const parsedTheme = window.localStorage.getItem("theme");
    let theme = parsedTheme === "dark" ? Themes.dark : Themes.light;
    theme && setTheme(theme);
  }, []);

  return [theme, toggleTheme];
};
