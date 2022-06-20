const socialReducer = (state = "", action) => {
  switch (action.type) {
    case "SOCIAL_TYPE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default socialReducer;
