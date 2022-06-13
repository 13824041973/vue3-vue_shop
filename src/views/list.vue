<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar title="类别列表" />

        <!-- 内容区 -->
        <div class="content">
            <!-- 左侧列表 -->
            <van-sidebar v-model="leftCurrent" class="leftlist">
                <van-sidebar-item v-if="leftList.value" v-for="item in leftList.value" :key="item.id"
                    :title="item.mallCateforyName" />
            </van-sidebar>

            <!-- 顶部列表 -->
            <van-tabs v-model:active="topCurrent" class="toptabs">
                <!-- 展示内容 -->
                <van-tab v-if="topList.value" v-for="item in topList.value" :key="item.id" :title="item.mallSubName">
                    <div v-if="list.value" v-for="item2 in list.value" :key="item2.id">
                        <router-link :to="{ path: '/details', query: { id: item2.id } }" class="routerLink">
                            <van-image :src="$restUrl(item2.pictureComperssPath)" width="100" height="100" lazy-load>
                                <template v-slot:loading>
                                    加载中...
                                </template>
                                <template v-slot:error>加载失败</template>
                            </van-image>
                            <span>
                                {{ item2.name }}
                                <p>￥{{ item2.presentPrice }}</p>
                            </span>
                        </router-link>
                    </div>
                </van-tab>
            </van-tabs>
        </div>



        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue"
import { getCurrentInstance, onActivated, onBeforeMount, reactive, ref, toRefs, watchEffect } from "vue"
export default {
    components: { tabbar },
    props: {
        index: {
            type: String
        }
    },
    setup(props) {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties

        let leftCurrent = ref(0);
        let topCurrent = ref(0);
        const leftList = reactive({});
        const topList = reactive({});
        // 展示内容的数据
        let list = reactive({});
        // 主页传入进来的index
        let { index } = toRefs(props);

        onBeforeMount(() => {
            // 获取大类列表
            that.$http.get('goods/getCategoryList')
                .then(res => {
                    leftList.value = res.data.data;
                    console.log('leftList---', leftList.value);
                });
        });

        onActivated(() => {
            if (index) {
                leftCurrent.value = index.value;
            }
        });

        const stopTopList = watchEffect(() => {
            // 获取小类列表
            topCurrent.value = 0;
            that.$http.post('goods/getCategorySubList', { categoryId: (leftCurrent.value ? (leftList.value[leftCurrent.value].id) : 1) })
                .then(res => {
                    topList.value = res.data;
                    console.log('topList---', topList.value);
                });
        });

        const stopList = watchEffect(() => {
            // 获取内容列表
            that.$http.post('goods/getGoodsListByCategorySubID', { categorySubId: (topList.value ? (topList.value[topCurrent.value].id) : 1) })
                .then(res => {
                    list.value = res.data;
                    console.log('list---', list.value);
                })
                .catch(error => {
                    console.log(error);
                });
        })

        return {
            leftCurrent,
            topCurrent,
            leftList,
            topList,
            list,
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    margin-bottom: 50px;

    .leftlist {
        width: 80px;
    }

    .toptabs {
        width: 295px;
        flex: 1;
    }
}

.routerLink {
    display: flex;
    text-decoration: none;
    color: #000;
}
</style>