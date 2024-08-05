import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RegistrationPage from './pages/1LogReg/RegistrationPage';
import AuthorizationPage from './pages/1LogReg/AuthorizationPage';
import LogOutPage from './pages/1LogReg/LogOutPage';
import { useEffect, useState } from 'react';
import NotFoundPage from './pages/1LogReg/NotFoundPage';

import apiAxiosInstance, { setAccessToken } from '../service/apiAxiosInstance';
import HomePage from './pages/HomePage/HomePage';
import Nav from './components/NavBar/Nav';
import NotesPage from './pages/NotesPage/NotesPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import QuotesPage from './pages/QuotesPage/QuotesPage';
import ObjectWritingPage from './pages/ObjectWritingPage/ObjectWritingPage';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    apiAxiosInstance.get('/tokens/refresh').then(({ data }) => {
      setAccessToken(data.accessToken);
      setCurrentUser(data.user);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav currentUser={currentUser} />
        <Routes>
          {/*  */}
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route
            path="/auth/reg"
            element={<RegistrationPage setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/auth/login"
            element={<AuthorizationPage setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/auth/logout"
            element={
              <LogOutPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/notes"
            element={<NotesPage currentUser={currentUser} />}
          ></Route>

          <Route
            path="/note/:id"
            element={<NotesPage currentUser={currentUser} />}
          ></Route>
          <Route path="/questions" element={<QuestionsPage />}></Route>

          <Route path="/quotes" element={<QuotesPage />}></Route>

          <Route path="/objectwriting" element={<ObjectWritingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
