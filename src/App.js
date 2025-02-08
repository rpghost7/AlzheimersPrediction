import "./App.css";
import Introduction from "./Introduction";
import PopulationGraph from "./PopulationGraph";
import HorizontalScroll from "./HorizontalScroll";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
body::-webkit-scrollbar {
    display: none;
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
      {/* <PopulationGraph></PopulationGraph> */}
      <GlobalStyle />
      <HorizontalScroll></HorizontalScroll>
    </>
  );
}

export default App;
