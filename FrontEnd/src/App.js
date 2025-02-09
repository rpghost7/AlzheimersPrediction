import "./App.css";
import Introduction from "./Introduction";

import HorizontalScroll from "./HorizontalScroll";
import { createGlobalStyle } from 'styled-components';
import PredictComponent from "./PredictComponent";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* Webkit browsers (Chrome, Safari, newer versions of Opera) */
  ::-webkit-scrollbar {
    width: 6px;  /* Make scrollbar thin */
  }

  ::-webkit-scrollbar-track {
    background: #0f172a;  /* Dark background for contrast */
  }

  ::-webkit-scrollbar-thumb {
    background: #00f7ff;  /* Neon blue color */
    border-radius: 3px;  /* Rounded corners */
    &:hover {
      background: #00d8ff;  /* Slightly darker on hover */
    }
  }
  body {

    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <>
    <Introduction></Introduction>
     
      <GlobalStyle />
      <HorizontalScroll></HorizontalScroll>
      <PredictComponent></PredictComponent>
    </>
  );
}

export default App;
