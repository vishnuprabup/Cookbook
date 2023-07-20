export const initialAuthData = () => {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
};

export const isEmailValid = (email) => {
  if (email.length > 5 && email.includes("@") && email.includes(".")) {
    return true;
  }
  return false;
};

export const isPasswordValid = (password) => {
  if (password.length > 7) {
    return true;
  } else {
    return false;
  }
};

export const initialState = {
  loading: false,
  user: [],
  error: {
    state: false,
    message: "",
  },
};
