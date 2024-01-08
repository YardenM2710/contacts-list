import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContactPage } from './pages/contact-page/ContactPage';

import './styles/main.scss';
import { ContactDetails } from './pages/contact-details/ContactDetails';
import useIsMobile from './custom-hooks/use-is-mobile.hook';
import { SnackbarProvider } from 'notistack';

function App() {
  const isMobile = useIsMobile()
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <div className="App main-app">
          <main className={isMobile ? '' : 'container'}>
            <Routes>
              <Route path="/" element={<ContactPage />}></Route>
              <Route path="/contact/:id" element={<ContactDetails />}></Route>
            </Routes>
          </main>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
