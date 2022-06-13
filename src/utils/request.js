import axios from "axios";
import { Toast } from 'vant';

axios.defaults.baseURL = 'http://vt.ossjk.com/';
// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
// 设置超时
axios.defaults.timeout = 3000;

axios.interceptors.request.use(
    config => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:1000,
        });
        return config;
    }, error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }, error => {
        console.log(error);
    }
);

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data,
            })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                });
        })
    },
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data
            })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}