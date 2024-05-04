
import React, { useContext, useEffect } from "react";
import AuthProvider, { useAuth } from "./contexts/authUserContext";
import { connectMetaMask } from "./functions/connectMetamask";
import './components/css/register.css';
import ProtectedRoute from "./components/protectedRoutes";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
// import Home from './Home';

import OtpVerification from './components/Registration/OtpVerification';

import Register from './components/Registration/Register_client';
import { ToastContainer } from 'react-toastify';
import RegisterFree from './components/Registration/Register_free';
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Registration/SIgnup";

import Landing from "./components/intropage/landing";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';



function MetaMaskButton() {
  const { setUserAddress, setIsAuthenticated } = useAuth();
  const onClick = async () => {
    const userAddress = await connectMetaMask();
    if (userAddress) {
      setUserAddress(userAddress);
      setIsAuthenticated(true);
    } else {
      setUserAddress(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <button onClick={onClick} className="metamask-button">
      Connect with MetaMask
    </button>
  );
}


// function TestComponent() {
//   const authContext = useContext(authUserContext);
//   useEffect(() => {
//   }, [authContext]);

//   return (
//       <div>
//           <p>Is Authenticated: {authContext.isAuthenticated.toString()}</p>
//           <p>User Address: {authContext.userAddress}</p>
//       </div>
//   );
// }

// client/src/App.js

// function App() {
//   return (
//     <div className="App">
//       <ToastContainer theme='colored' position='top-center'></ToastContainer>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Landing />} />
//           <ProtectedRoute path='/client' element={<Register />} />
//           <ProtectedRoute path='/register' element={<RegisterFree />} />
//           <ProtectedRoute path='/otp' element={<OtpVerification />} />
//           <ProtectedRoute path='/signup' element={<Signup />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Landing />
      ),
    },
    {
      path: '/client',
      element: (
        <ProtectedRoute>
          <Register />
        </ProtectedRoute>
      ),
    },
    {
      path: '/register',
      element: (
        <ProtectedRoute>
          <RegisterFree />
        </ProtectedRoute>
      ),
    },
    {
      path: '/otp',
      element: (
        <ProtectedRoute>
          <OtpVerification />
        </ProtectedRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <ProtectedRoute>
          <Signup />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <AuthProvider isSignedIn={false}>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}



//       <h1>No Form</h1>
//       <AuthProvider>
//         <MetaMaskButton />
//       </AuthProvider>
//     </div>
//   );
// }


export default App;