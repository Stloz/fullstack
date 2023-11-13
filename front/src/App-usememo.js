// import React from "react";
import { useState, useEffect, useMemo } from "react";
import Page from "./component/page";

function Child({ state }) {
  console.log("render");

  const data = useMemo(() => {
    console.log("Hello World");

    return state * 10;
    // return Math.random() + Math.random + console.log("Hello World");
  }, [state]);

  return <div>Child {data}</div>;
}

function AppUseMemo() {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setState((prev) => prev + 1), 1000);
    const id2 = setInterval(() => setState2((prev) => prev + 1), 5000);

    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);

  return (
    <Page>
      Hello World {state} <Child state={state2} />
    </Page>
  );
}

export default AppUseMemo;
