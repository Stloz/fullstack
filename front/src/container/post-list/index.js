import {
  useState,
  Fragment,
  useEffect,
  useReducer,
  lazy,
  Suspense,
  useCallback,
} from "react";

import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";

import PostCreate from "../post-create";

// import PostItem from "../post-item";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getdate";
import { useWindowListeren } from "../../util/useWindowListeren";
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "../../util/request";

const PostItem = lazy(() => import("../post-item"));

export default function Container() {
  //ось тут отримую state та dispatch
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  // const [status, setStatus] = useState(null);
  // const [message, setMessage] = useState("");
  // const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    // було до уроку про useReducer
    // setStatus(LOAD_STATUS.PROGRESS);
    //стало після уроку про useReducer
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });

    try {
      const res = await fetch("http://localhost:4000/post-list");

      const data = await res.json();

      if (res.ok) {
        // було до уроку про useReducer
        // setData(convertData(data));
        // setStatus(LOAD_STATUS.SUCCESS);

        //стало після уроку про useReducer
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: convertData(data),
        });
      } else {
        // було до уроку про useReducer
        // setMessage(data.message);
        // setStatus(LOAD_STATUS.ERROR);

        //стало після уроку про useReducer
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: data.message,
        });
      }
    } catch (err) {
      // було до уроку про useReducer

      // setMessage(err.message);
      // setStatus(LOAD_STATUS.ERROR);

      //стало після уроку про useReducer

      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: err.message,
      });
    }
  }, []);

  //конввертування даних
  //в raw приходить обєкт сирих даних
  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),
    isEmpty: raw.list.length === 0,
  });

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => getData(), 5000);

    return () => {
      clearInterval(intervalId);
      // alert(2);
    };
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListeren("pointermove", (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return (
    <Grid>
      {/* <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px,${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      ></div> */}
      <Box>
        <Grid>
          <Title>Home</Title>
          {/* PostCreate - це поле з кнопкою для створення нового поста */}
          {/* Коли у нас буде створюватись новий пост у нас буде визиватися пропс onCreate */}
          {/* в onCreate ми одразу покладемо функцію getData для того щоб одразу оновлювався список постів */}
          {/* також в PostCreate ми передаємо placeholder і  button*/}
          <PostCreate
            onCreate={getData}
            placeholder="What is happening?!"
            button="Post"
          />
        </Grid>
      </Box>

      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <Fragment>
          <Box>
            <Skeleton />
          </Box>
          <Box>
            <Skeleton />
          </Box>
        </Fragment>
      )}

      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}

      {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
        <Fragment>
          {state.data.isEmpty ? (
            <Alert message="Список постів пустий" />
          ) : (
            state.data.list.map((item) => (
              <Fragment key={item.id}>
                <Suspense
                  fallback={
                    <Box>
                      <Skeleton />
                    </Box>
                  }
                >
                  <PostItem {...item} />
                </Suspense>
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  );
}
