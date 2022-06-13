<template>
    <div>
        <!-- 搜索 -->
        <van-search shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />

        <!-- 轮播图 -->
        <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in data.value.slides" :key="item.goodsId" v-if="data.value">
                <router-link :to="{ path: '/details', query: { id: item.goodsId } }">
                    <img :src="$restUrl(item.image)">
                </router-link>
            </van-swipe-item>
        </van-swipe>

        <!-- 分类 -->
        <van-grid :column-num="5">
            <van-grid-item v-for="(item, index) in data.value.category" :key="item.mallCategoryId"
                :icon="$restUrl(item.image)" :text="item.mallCategoryName" v-if="data.value"
                :to="{ path: '/list', query: { index: index } }" />
        </van-grid>

        <!-- 广告 -->
        <marquee direction="right" scrolldelay="50">
            <img :src="$restUrl(data.value.advertesPicture.PICTURE_ADDRESS)" v-if="data.value">
        </marquee>

        <!-- 推荐 -->
        <van-swipe :loop="false" :width="125" indicator-color="gray">
            <van-swipe-item v-for="item in data.value.hotGoods" :key="item.goodsId" v-if="data.value">
                <router-link :to="{ path: '/details', query: { id: item.goodsId } }" class="routerLink">
                    <div class="oneRecommend">
                        <img :src="$restUrl(item.image)">
                        <p>{{ $restName(item.name) }}...</p>
                        <p>￥{{ item.price }}(￥{{ item.mallPrice }})</p>
                    </div>
                </router-link>
            </van-swipe-item>
        </van-swipe>

        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue";
import { getCurrentInstance, reactive, onBeforeMount } from "vue";
export default {
    name: 'home',
    components: { tabbar, },

    setup() {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties

        const data = reactive({});//请求接口返回的首页数据

        onBeforeMount(() => {
            that.$http.get('goods/getIndexInfo')
                .then(res => {
                    data.value = res.data.data;
                    console.log('data', data);
                })
        })

        return {
            data,
        };
    },
}
</script>

<style lang="scss" scoped>
// 轮播图
.swiper {
    img {
        width: 375px;
    }
}

// 广告
marquee {
    img {
        height: 37.5px;
    }
}

.routerLink {
    text-decoration: none;
    color: #000;
}

// 推荐
.oneRecommend {
    img {
        width: 105px;
    }
}
</style>