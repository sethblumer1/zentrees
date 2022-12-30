import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInIndex } from './SignInComps/SignInIndex';

function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
