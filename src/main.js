import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import { store } from './store';
import { setUpVant } from '@/plugins/vant';
import { setUpAxios,setUpStorage,setUpRestUrl,setUpRestName } from "@/utils";

const app = createApp(App);

// 注册vant
setUpVant(app);
// 全局挂载封装的axios请求
setUpAxios(app);
// 全局挂载storage的处理
setUpStorage(app);
// 全局挂载处理图片url的方法
setUpRestUrl(app);
// 全局挂载处理商品名字长度的方法
setUpRestName(app);
// 注册路由
// 使用Vuex
app.use(router)
    .use(store)
    .mount('#app');