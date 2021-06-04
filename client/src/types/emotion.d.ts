import { ThemeIterface } from "./../components/types/styleIterface";
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends ThemeIterface {}
}
