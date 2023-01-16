import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';

// create the context
export const GlobalContext = createContext();

// provider
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const changeUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', userData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.clear();
    window.location.reload(false);
  };

  const getReminders = (userId) => {};

  useEffect(() => {
    console.log(user);
    // getReminders();
  }, [user]);

  return (
    <GlobalContext.Provider value={{ user, changeUser, clearUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}

// // reducer
// const globalReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_USER':
//       return {
//         ...state,
//         user: action.payload,
//         fetchingUser: false,
//       };
//     case 'SET_REMINDERS':
//       return {
//         ...state,
//         reminders: action.payload,
//       };

//     case 'RESET_USER':
//       return {
//         ...state,
//         user: null,
//         reminders: [],
//         fetchingUser: false,
//       };
//     default:
//       return state;
//   }
// };

// // create the context
// export const GlobalContext = createContext(initialState);

// // provider component
// export const GlobalProvider = (props) => {
//   const [state, dispatch] = useReducer(globalReducer, initialState);

//   useEffect(() => {
//     getCurrentUser();
//   }, []);

//   // Action: Get current user
//   const getCurrentUser = async () => {
//     try {
//       const res = await axios.get('/api/auth/current');

//       if (res.data) {
//         const remindersRes = await axios.get('/api/reminders/current');

//         if (remindersRes.data) {
//           dispatch({ type: 'SET_USER', payload: res.data });
//           dispatch({ type: 'SET_REMINDERS', payload: remindersRes.data });
//         }
//       } else {
//         dispatch({ type: 'RESET_USER' });
//       }
//     } catch (err) {
//       console.log(err);
//       dispatch({ type: 'RESET_USER' });
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.put('/api/auth/logout');
//       dispatch({ type: 'RESET_USER' });
//     } catch (err) {
//       console.log(err);
//       dispatch({ type: 'RESET_USER' });
//     }
//   };

//   const value = {
//     ...state,
//     getCurrentUser,
//     logout,
//   };

//   return (
//     <GlobalContext.Provider value={value}>
//       {props.children}
//     </GlobalContext.Provider>
//   );
// };
