<template>
    <div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item to="/list" icon="search">列表</van-tabbar-item>
            <van-tabbar-item to="/shopcar" icon="cart-o" :badge="goodsLength">购物车</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-o">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { computed, getCurrentInstance, onActivated, ref, watch } from 'vue';

export default {
    name: 'tabbar',
    setup() {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties;

        that.$store.commit("getGoodsLength");
        const goodsLength = computed(()=>that.$store.state.goodsLength);

        const active = ref(3);

        


        return {
            active,
            goodsLength
        };
    },
}
</script>