import axios from 'axios';
import { ICreateComment } from '../types/comment';
import { ICreateProduct } from '../types/product';
import { ILogin, ISingUp, IUser } from '../types/user'

let baseURL = 'http://localhost:3000/api'
let ISSERVER = typeof window === "undefined";
let isFoundUser: string | null = null;
let user: IUser | null = null;

if (!ISSERVER) isFoundUser = localStorage.getItem("user");
if (isFoundUser) user = JSON.parse(isFoundUser);

if (process.env.NODE_ENV === "production" && !ISSERVER) {
    baseURL = `https://${window.location.host}/api`;
}

const API = axios.create({ baseURL: baseURL })

API.interceptors.request.use((req) => {
    if (user && req?.headers?.authorization) req.headers.authorization = `Bearer ${user.token}`;
    return req
})

export const singUp = async (data: ISingUp) => await API.post("/auth/sign-up", data)

export const login = async (data: ILogin) => await API.post("/auth/login", data)

export const Logout = async () => await API.get("/auth/logout")

export const GetToken = async () => await API.get("/auth/refresh-token");

export const createProduct = async (data: ICreateProduct) => await API.post("/admin/create-product", data)

export const getCategoriesAndTags = async () => await API.get("/admin/create-product")

export const getProducts = async () => await API.get("/product")

export const getComments = async (id: number) => await API.get(`/comment/?id=${id}`)

export const createComment = async (id: number, data: ICreateComment) => await API.post(`/comment/?id=${id}`, data)

export const deleteComment = async (productId: number, commentId: number) => await API.delete(`/comment/?id=${productId}&commentId=${commentId}`);

export const updateComment = async (productId: number, commentId: number, data: ICreateComment) => await API.patch(`/comment/?id=${productId}&commentId=${commentId}`, data);

export const getLikes = async (productId: number) => await API.get(`/like/?id=${productId}`);

export const likeProduct = async (productId: number) => await API.patch(`/like/?id=${productId}`);
