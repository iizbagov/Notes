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
