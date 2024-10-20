const API_URL = "https://shift-backend.onrender.com";
export const sendOTP = async (phoneNumber: string) => {
  return fetch(`${API_URL}/auth/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phoneNumber }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`response code is ${response}`);
      return response;
    })
    .then((response) => response.json());
};

export const signIn = async (phoneNumber: string, otpcode: string) => {
  return fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phoneNumber, code: otpcode }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`response code is ${response.json()}`);
      return response;
    })
    .then((response) => response.json());
};

export const getProfile = async (token: string) => {
  return fetch(`${API_URL}/users/session`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`response code is ${response.json()}`);
      return response;
    })
    .then((response) => response.json());
};
