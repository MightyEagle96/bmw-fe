const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return (state = action.payload);

    default:
      return state;
  }
};

export default loggedUserReducer;
