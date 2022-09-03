import api from "../api";
import { RefreshTokenResponse } from "./dtos/refreshTokenResponse.dto";
import { AuthResponseDto } from "./dtos/authResponse.dto";

export interface LoginProps {
  email: string;
  password: string;
}

export const TOKEN_KEY = "@menteSa-Token";
export const REFRESH_TOKEN = "@menteSa-RefreshTokem";
export const USER_EMAIL = "@menteSa-UserEmail";
export const PROFESSIONAL_ID = "@menteSa-ProfessionalID";
export const PROFESSIONAL_NAME = "@menteSa-ProfessionalName";

export async function fetchUserLogin({
  email,
  password,
}: LoginProps): Promise<AuthResponseDto> {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  const url = "auth/login";
  const payload = { email, password };

  const { data, status } = await api.post(url, payload);

  if (status === 200) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data.token.accessToken));
    localStorage.setItem(
      REFRESH_TOKEN,
      JSON.stringify(data.token.refreshToken)
    );
    localStorage.setItem(USER_EMAIL, JSON.stringify(data.user.email));
    localStorage.setItem(PROFESSIONAL_ID, JSON.stringify(data.user.id));
    localStorage.setItem(PROFESSIONAL_NAME, JSON.stringify(data.user.name));
  }
  return data;
}

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL);
export const getUserId = () => {
  const id = localStorage.getItem(PROFESSIONAL_ID);
  if (id) {
    return JSON.parse(id);
  } else {
    ("");
  }
};
export const getUserName = () => {
  const id = localStorage.getItem(PROFESSIONAL_NAME);
  if (id) {
    return JSON.parse(id);
  } else {
    ("");
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
};

export async function fetchRefreshToken(
  email: string,
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const url = "auth/refresh-token";

  const payload = { email, refreshToken };

  const { data, status } = await api.post(url, payload);

  if (status === 200) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data.accessToken));
    localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refreshToken));
  }
  return data;
}
