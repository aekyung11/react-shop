import { atom } from "recoil";
import CONSTANTS from "../constants/constants";

const THEME_KEY = "theme";

export const themeState = atom<string>({
  key: "theme",
  default: CONSTANTS.THEME.LIGHT,
  effects: [
    ({ setSelf, onSet }) => {
      const savedTheme = localStorage.getItem(THEME_KEY);
      savedTheme && setSelf(savedTheme);
      onSet((value) => {
        localStorage.setItem(THEME_KEY, value);
      });
    },
  ],
});
