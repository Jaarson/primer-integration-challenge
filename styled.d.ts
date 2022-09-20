import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      pure: string;
      primary: string;
      secondary: string;
      surface: string;
      popper: string;
      inputs: string;
      inputsActive: string;
      placeholders: string;
    };
  }
}
