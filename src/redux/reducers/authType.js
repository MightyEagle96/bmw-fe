const authTypeReducer = (state = "", action) => {
  switch (action.type) {
    case "AUTH_TYPE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default authTypeReducer;
