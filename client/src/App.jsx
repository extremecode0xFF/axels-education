import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { GlobalStyles } from "./styled/GlobalStyles.ts";

import { Home } from "./components/Home";
import { ReactGrid } from "./components/ReactGrid";
import { homeSections } from "./configs/homeSections";
import { Header } from "./components/Header";
import GraphQL from "./components/GraphQL";

function App() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header />
        <Container sx={{ pt: "100px" }}>
          <Routes>
            <Route exact path="/" element={<Home data={homeSections} />} />
            <Route path="/reactgrid" element={<ReactGrid />} />
            <Route path="/graphql" element={<GraphQL />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
}

export default App;
