// import React from "react";
import { useState, useEffect, useRef } from "react";
import Page from "./component/page";
// import PostList from "./container/post-list";
import Grid from "./component/grid";
import Box from "./component/box";

//Пример 1 - нажимая на кнопку екран прокручивался до нужного места
// function App() {
//   const firstCatRef = useRef(null);
//   const secondCatRef = useRef(null);
//   const thirdCatRef = useRef(null);

//   function handleScrollBy(ref) {
//     if (ref.current) {
//       const offsetTop = ref.current.offsetTop;
//       window.scrollBy({
//         top: offsetTop,
//         behavior: "smooth",
//       });
//     }
//   }

//   return (
//     <Page>
//       <Grid>
//         <button onClick={() => handleScrollBy(firstCatRef)}>Tom</button>
//         <button onClick={() => handleScrollBy(secondCatRef)}>Maru</button>
//         <button onClick={() => handleScrollBy(thirdCatRef)}>Jerry</button>
//       </Grid>
//       <div>
//         <ul style={{ display: "grid", gap: "500px", marginButton: "500px" }}>
//           <li>
//             <img
//               src="https://placekitten.com/g/200/200"
//               alt="Tom"
//               ref={firstCatRef}
//             />
//           </li>
//           <li>
//             <img
//               src="https://placekitten.com/g/300/200"
//               alt="Maru"
//               ref={secondCatRef}
//             />
//           </li>
//           <li>
//             <img
//               src="https://placekitten.com/g/250/200"
//               alt="Jerry"
//               ref={thirdCatRef}
//             />
//           </li>
//         </ul>
//       </div>
//       {/* <PostList /> */}
//     </Page>
//   );
// }

//Пример 2 - фокус на поле ввода при загрузке страници
// function App() {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (inputRef && inputRef.current) inputRef.current.focus(); //Фокус на поле введеня після завантаженн сторінки
//   }, []);

//   return (
//     <Page>
//       <Grid>
//         <Box>
//           <input ref={inputRef} placeholder="Введіть пошту" />
//         </Box>
//         <Box>
//           <input placeholder="Введіть пароль" />
//         </Box>
//       </Grid>

//       {/* <PostList /> */}
//     </Page>
//   );
// }

//Пример 3

// function App() {
//   const prevValueRef = useRef("null");
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     console.log("value", value);
//     console.log("prevValueRef", prevValueRef);

//     prevValueRef.current = value;
//   }, [value]);

//   const handleIncrement = () => {
//     setValue(value + 1);
//   };

//   console.log("render");

//   return (
//     <Page>
//       <Grid>
//         <Box>
//           <p> Current value: {value}</p>
//           <p> Previous value: {prevValueRef.current}</p>
//         </Box>
//         <Box>
//           <button onClick={handleIncrement}> Increment</button>
//         </Box>
//       </Grid>

//       {/* <PostList /> */}
//     </Page>
//   );
// }

//Пример 5

function App() {
  const scrollPositionRef = useRef(0);

  const handleScroll = () => {
    scrollPositionRef.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("scrollPositionRef", scrollPositionRef);
  }, [scrollPositionRef.current]);

  return (
    <Page>
      <button onClick={handleScroll}>Click</button>
      <p style={{ height: 10000 }}></p>

      {/* <PostList /> */}
    </Page>
  );
}
export default App;
