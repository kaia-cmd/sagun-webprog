import axios from 'axios';
import constants from '../../constants';

const API = axios.create({
    baseURL: `${constants.HOST}/articles`,
});

// Attach token from localStorage (if present) to every request
API.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (e) {
        // ignore when localStorage not available
    }
    return config;
});

export const fetchArticles = () => API.get('/');

export const fetchArticleByName = (name) => API.get(`/slug/${name}`);

export const createArticle = (article) => API.post('/', article);

export const updateArticle = (id, article) => API.put(`/${id}`, article);

export const deleteArticle = (id) => API.delete(`/${id}`);
