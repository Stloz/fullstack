// import React from "react";
import { useState, useMemo, createContext, useReducer } from "react";
import Page from "./component/page";
import PostList from "./container/post-list";

export const THEME_TYPE = {
  LIGHT: "light",
  DARK: "dark",
};

export const ThemeContext = createContext(null);

const THEME_ACTION_TYPE = { TOGGLE: "toggle" };

const themeReducer = (state, action) => {
  switch (action.type) {
    //на дії toggle
    case THEME_ACTION_TYPE.TOGGLE:
      // змінюємо state
      return state === THEME_ACTION_TYPE.DARK
        ? THEME_ACTION_TYPE.LIGHT
        : THEME_ACTION_TYPE.DARK;
    default:
      return state;
  }
};

function AppContext() {
  // const [currentTheme, setTheme] = useState(THEME_TYPE.LIGHT);

  const [currentTheme, dispatch] = useReducer(themeReducer, THEME_TYPE.DARK);
  // const handleChangeTheme = () => {
  //   setTheme((prevTheme) => {
  //     if (prevTheme === THEME_TYPE.DARK) {
  //       return THEME_TYPE.LIGHT;
  //     } else {
  //       return THEME_TYPE.DARK;
  //     }
  //   });

  const theme = useMemo(
    () => ({
      value: currentTheme,
      toggle: ()=>dispatch({type: THEME_ACTION_TYPE.TOGGLE}),
    }),
    [currentTheme]
  );
  };

  // const theme = useMemo(
  //   () => ({
  //     value: currentTheme,
  //     toggle: handleChangeTheme,
  //   }),
  //   [currentTheme]
  // );
  

  
  return (
    <Page>
      <ThemeContext.Provider value={theme}>
        <PostList />
      </ThemeContext.Provider>
    </Page>
  );
}

export default AppContext;
