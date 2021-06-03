import { ReactElement } from "react";
interface ThemeProperty {
  light: string;
  dark: string;
}

export interface ThemeIterface {
  mainBackground: ThemeProperty;
  titleColor: ThemeProperty;
  headersColor: ThemeProperty;
  buttonColor: ThemeProperty;
  linkColor: ThemeProperty;
  noteBgColor: ThemeProperty;
  isCompleted: boolean;
}

export interface StyledComponentProps {
  children: ReactElement;
  theme: ThemeIterface;
}

declare module "@emotion/react" {
  export interface Theme extends Record<string, any> {}
}
