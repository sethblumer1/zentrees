import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInIndex } from './SignInComps/SignInIndex';
import Landing from './LandingComps/Landing';
import { useGlobalContext } from './context/GlobalContext';

function Layout() {
  // const { fetchingUser, user } = useGlobalContext();

  // return fetchingUser ? (
  //   <>
  //     <h1>Loading...</h1>
  //   </>
  // ) : (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route exact path="/" element={<SignInIndex />} />
  //       <Route path="/dashboard" element={<Landing />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInIndex />} />
        {/* <Route path="/dashboard" element={<Landing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
