import {createContext, useContext} from 'react';

export const initialState = {
  user: {firstName: 'Rahul', lastName: 'Bussa'},
  theme: 'light',
  transactions: [
    {addedtime: 1576590342000, id: 2, description: 'Amala Soup', amount: -40},
  ],
  userLoggedIn: false,
};

export const StateContext = createContext(initialState);

export const useGlobals = () => useContext(StateContext);
