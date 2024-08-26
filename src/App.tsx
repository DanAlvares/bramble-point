
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import SelectCashier from './pages/SelectCashier/SelectCashier';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<SelectCashier />} />
          </Routes>
        </Router>
      </main>

    </>
  );
}

export default App;
