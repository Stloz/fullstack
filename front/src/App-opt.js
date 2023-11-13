// import React from "react";
import { lazy, useState, useEffect, useMemo, Suspense } from "react";
import Page from "./component/page";

const Child = lazy(() => import("./Child"));

function AppOptimisation() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setValue((prev) => prev + 1), 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  console.log("App");

  return (
    <Page>
      <div>State: {value}</div>
      <div>
        {value > 5 && (
          <Suspense fallback={<div>Loading...</div>}>
            <Child value={value} />
          </Suspense>
        )}
      </div>
    </Page>
  );
}

export default AppOptimisation;
