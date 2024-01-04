import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactPage } from './pages/ContactPage';

import './styles/main.scss';
import { ContactDetails } from './pages/ContactDetails';
import useIsMobile from './custom-hooks/use-is-mobile.hook';

function App() {
  const isMobile = useIsMobile()
  return (
    <Router>
      <div className="App main-app">
        {/* <MainHeader /> */}
        <main className={isMobile ? '' : 'container'}>
          <Routes>
            <Route path="/" element={<ContactPage />}></Route>
            <Route path="/contact/:id" element={<ContactDetails />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
