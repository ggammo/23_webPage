import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("grantType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'http://taonas.iptime.org:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});
/** LOGIN API */
export const login = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/auth/login`, data);
    return response.data;
}
/** SIGNUP API */
export const signUp = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/auth/signup`, data);
    return response.data;
}

export const Search=axios.create({
    baseURL:'http://taonas.iptime.org:8080',
    headers:{
        'Content-Type': 'application/json',
    }
});
export const search=async(values)=>{
    const data={values};
    const response = await Search.get(``,values);
    return response.data;
}


export const UploadApi = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'http://taonas.iptime.org:8080',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});

export const upload = async (formData) => {
    for (const x of formData.entries()) {
        console.log(x);
    };
    console.log(ACCESS_TOKEN);
    const response = await UploadApi.post(`/item/upload`, formData);
    return response.data;
}
export const Download=axios.create({
    baseURL:'http://taonas.iptime.org:8080',
    headers:{
        'Content-Type': 'application/json',
    }
});