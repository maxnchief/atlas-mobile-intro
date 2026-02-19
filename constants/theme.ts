/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const mainColor = "#58a351";
const secondaryColor = "#f7da21";
const backgroundColor = "#FBF0BE";
const tintColorLight = mainColor;
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#222",
    background: backgroundColor,
    tint: mainColor,
    icon: mainColor,
    tabIconDefault: "#b5c9a3",
    tabIconSelected: secondaryColor,
    primary: mainColor,
    secondary: secondaryColor,
  },
  dark: {
    text: "#ECEDEE",
    background: "#222",
    tint: mainColor,
    icon: mainColor,
    tabIconDefault: "#b5c9a3",
    tabIconSelected: secondaryColor,
    primary: mainColor,
    secondary: secondaryColor,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
