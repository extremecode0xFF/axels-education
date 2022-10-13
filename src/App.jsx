import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Home } from './components/Home';
import { GlobalStyles } from './styled/GlobalStyles.ts';
import { ReactGrid } from './components/ReactGrid';
import { homeSections } from './configs/homeSections';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <GlobalStyles />

      <Container>
        <Header />
        <Container sx={{ pt: '100px' }}>
          <Routes>
            <Route exact path="/" element={<Home data={homeSections} />} />
            <Route path="/reactgrid" element={<ReactGrid />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
}

export default App;
