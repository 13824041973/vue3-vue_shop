import { createStore } from "vuex";
import $storage from "@/utils/storage.js";

export const store = createStore({
    state: {
        goodsLength: 5,
    },
    mutations: {
        getGoodsLength(state) {
            // console.log($storage.getStorage("shopCarList").length);
            state.goodsLength = $storage.getStorage("shopCarList").length;
        },
        lessLength(state){
            state.goodsLength -= 1;
        }
    },
    actions: {

    },
})