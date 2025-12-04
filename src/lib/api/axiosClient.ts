import axios from 'axios';
// import { store } from '../redux/store';
// import { AuthTokenSchema } from '../redux/services/authentication/schemas/authentication_state';
// import { setAppTokenState } from '../redux/services/authentication/authenticationService';
// import { ResponseWrapperSchema } from './models/response';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = store.getState().appAuthenticationState?.token?.token;
//     console.log("[TOKEN_STATE] : ", token);
//     if (token) config.headers['Authorization'] = `Bearer ${token}`;
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const response = await axiosInstance.post('/auth/refresh-token', {
//                     refreshToken: store.getState().appAuthenticationState?.token?.refreshToken,
//                 });

//                 const data = ResponseWrapperSchema(AuthTokenSchema).safeParse(response.data);
//                 if (data.success) {
//                     store.dispatch(setAppTokenState(data.data!.data!));
//                     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
//                     originalRequest.headers['Authorization'] = `Bearer ${data.data.token}`;
//                 } else throw data.error;

//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 console.error("[ERROR}] : Token refresh failed!", refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//         if (error?.response?.data) return Promise.reject(error.response.data);
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;