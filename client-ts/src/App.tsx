import React, { useEffect, useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Page/HomePage/HomePage';
import NavBar from './Components/NavBar/NavBar';

import type CurrentUser from './Types/AppTypes';

import axiosInstance from '../services/axiosInstace';
import LoginPage from './Page/LogRegLogout/LoginPage';
import LogOutPage from './Page/LogRegLogout/LogOutPage';
import RegistrationPage from './Page/LogRegLogout/RegistrationPage';
import QuestionsPage from './Page/QuestionsPage/QuestionsPage';
import QuotesPage from './Page/QuotesPage/QuotesPage';
import ObjectWritingPage from './Page/ObjectWritingPage/ObjectWritingPage';
import NotFoundPage from './Page/LogRegLogout/NotFoundPage';
import NotePage from './Page/NotePage/NotePage';

function App(): JSX.Element {
  // const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<number>(123);

  // async function getCurrentUser(): void {
  //   try {
  //     const { data } AxiosResponse = await axiosInstance.get('/refresh/tokens');

  //     setCurrentUser(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    // getCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <NavBar currentUser={currentUser} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/notes" element={<NotePage />} />

        <Route path="/questions" element={<QuestionsPage />} />

        <Route path="/quotes" element={<QuotesPage />} />

        <Route path="/objectwriting" element={<ObjectWritingPage />} />

        <Route path="/auth/logout" element={<LogOutPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
