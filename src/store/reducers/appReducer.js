import {LOGIN_SUCCESS, LOGOUT_SUCCESS, SWITCH_THEME} from '../actions/types';
import {ADD_TRANSACTION, DELETE_TRANSACTION} from '../actions/types';
import {initialState} from '../../contexts/global';

// const initialState = {
//   user: { firstName: 'Rahul', lastName: 'Bussa'},
//   theme: 'dark',
//   transactions: [
//     { addedtime: 1576590342000, id: 2, description: "Amala Soup", amount: -40 },
//   ],
// };

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userLoggedIn: false,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(({id}) => id !== payload),
      };
    case SWITCH_THEME:
      console.log('in switch', payload);
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
