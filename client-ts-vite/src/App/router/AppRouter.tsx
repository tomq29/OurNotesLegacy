import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../Pages/HomePage/HomePage';
import QuestionsPage from '../../Pages/QuestionsPage/QuestionsPage';
import QuotesPage from '../../Pages/QuotesPage/QuotesPage';
import ObjectWritingPage from '../../Pages/ObjectWritingPage/ObjectWritingPage';
import LogOutPage from '../../Pages/LogRegLogout/LogOutPage';
import LoginPage from '../../Pages/LogRegLogout/LoginPage';
import RegistrationPage from '../../Pages/LogRegLogout/RegistrationPage';
import NotFoundPage from '../../Pages/LogRegLogout/NotFoundPage';
import NotesPage from '../../Pages/NotesPage/NotesPage';

function AppRouter(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/notes" element={<NotesPage />} />

        <Route path="/questions" element={<QuestionsPage />} />

        <Route path="/quotes" element={<QuotesPage />} />

        <Route path="/objectwriting" element={<ObjectWritingPage />} />

        <Route path="/auth/logout" element={<LogOutPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
