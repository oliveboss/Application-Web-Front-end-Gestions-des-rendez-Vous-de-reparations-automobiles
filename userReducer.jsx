import { SET_USER_INFO } from '../actions/userActions';

const initialState = {
  userInfo: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
