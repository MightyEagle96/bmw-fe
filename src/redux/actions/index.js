export const signIn = (data) => {
  return { type: "SIGN_IN", payload: data };
};

export const authType = (data) => {
  return { type: "AUTH_TYPE", payload: data };
};
