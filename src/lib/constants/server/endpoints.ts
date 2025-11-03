const ENV = process.env;
export const BASE_URL = ENV.NEXT_PUBLIC_BASE_URL ?? "-?-";

export const SERVER_API = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
}
