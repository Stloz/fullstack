import { useState, useReducer, memo, useCallback } from "react";

import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "../../util/request";

function Container({ onCreate, placeholder, button, id = null }) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  // було до уроку про useReducer
  // const [status, setStatus] = useState(null);
  // const [message, setMessage] = useState("");
  const convertData = useCallback(
    ({ value }) =>
      JSON.stringify({
        text: value, // value - це текст який вводиться в поле
        username: "user",
        postId: id,
      }),
    [id]
  );

  const sendData = useCallback(
    async (dataToSend) => {
      dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
      // було до уроку про useReducer
      // setStatus(LOAD_STATUS.PROGRESS); //у нас починається завантаження запита на сервер

      try {
        const res = await fetch("http://localhost:4000/post-create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: convertData(dataToSend),
        });

        const data = await res.json();

        if (res.ok) {
          // було до уроку про useReducer
          // setStatus(null);

          //стало після уроку про useReducer
          dispatch({ type: REQUEST_ACTION_TYPE.RESET });

          if (onCreate) onCreate();
        } else {
          // було до уроку про useReducer

          // setMessage(data.message);
          // setStatus(LOAD_STATUS.ERROR);
          //стало після уроку про useReducer

          dispatch({ type: REQUEST_ACTION_TYPE.ERROR, message: data.message });
        }
      } catch (err) {
        // було до уроку про useReducer
        // setMessage(err.message);
        // setStatus(LOAD_STATUS.ERROR);

        //стало після уроку про useReducer
        dispatch({ type: REQUEST_ACTION_TYPE.ERROR, message: err.message });
      }
    },
    [convertData, onCreate]
  );

  const hundleSubmit = useCallback(
    (value) => {
      return sendData({ value });
    },
    [sendData]
  );

  console.log("render");

  return (
    <Grid>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={hundleSubmit}
      />
      {state.status === LOAD_STATUS.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
      {state.status === LOAD_STATUS.PROGRESS && <Loader />}
    </Grid>
  );
}

export default memo(Container, (prev, next) => {
  // console.log(prev, next);

  return true;
});
