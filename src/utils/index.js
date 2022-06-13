import axios from "./request";
import storage from "./storage";
import { restUrl } from "./restUrl";
import { restName } from "./restName";

// 全局使用网络请求
export const setUpAxios = (app) =>{
    return app.config.globalProperties.$http=axios;
}
// 全局使用storage方法
export const setUpStorage = (app)=>{
    return app.config.globalProperties.$storage=storage;
}
// 全局使用修改图片url方法
export const setUpRestUrl = (app)=>{
    return app.config.globalProperties.$restUrl=restUrl;
}
// 全局使用更改商品名字方法(多的文字使用...代替)
export const setUpRestName = (app)=>{
    return app.config.globalProperties.$restName=restName;
}
