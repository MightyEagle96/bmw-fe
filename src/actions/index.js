export const signIn = (data) => {
  return { type: "SIGN_IN", payload: data };
};

export const socialType = (data) => {
  return { type: "SOCIAL_TYPE", payload: data };
};
