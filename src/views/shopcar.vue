<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />

        <!-- 无商品时 -->
        <van-empty v-if="!data.value" image="error" description="暂无商品" />

        <!-- 有商品时 -->
        <van-swipe-cell v-else v-for="(item, index) in data.value">
            <div class="oneShop">
                <van-checkbox v-model="item.isChecked">
                    <van-image width="100" height="100" :src="$restUrl(item.image)">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </van-checkbox>
                <div>
                    <p>{{ item.name }}({{ item.sku.type }})</p>
                    <van-stepper v-model="item.num" />
                </div>
                <p class="price">
                    <span>￥{{ item.sku.price }}</span>
                    <span>*{{ item.num }}</span>
                    <span>￥{{ (item.sku.price * item.num).toFixed(2) }}</span>
                </p>
            </div>

            <template #right>
                <van-button @click="removeShopCarList(index)" square text="删除" type="danger" class="delete-button" />
            </template>
        </van-swipe-cell>

        <!-- 支付，提交订单 -->
        <van-submit-bar :price="money" button-text="提交订单" class="submitByMoney">
            <van-checkbox v-model="AllChecked">全选</van-checkbox>
        </van-submit-bar>

        <!-- tabbar栏 -->
        <tabbar></tabbar>
    </div>
</template>

<script setup>
import tabbar from "@/components/tabbar.vue";
import { computed, getCurrentInstance, reactive, ref, watch, watchEffect } from "vue";

// 给setup设置一个this，为that
const that = getCurrentInstance().appContext.config.globalProperties;

// navBar返回上级
const onClickLeft = () => history.back();

// 存储购物车数据
let data = reactive([]);
// 总金额
let money = computed({
    get() {
        let allMoney = 0;
        for (let i of data.value) {
            // console.log(i);
            if (i.isChecked) {
                allMoney += parseFloat((i.sku.price * i.num).toFixed(2));
            }
        };
        let arr = allMoney.toFixed(2).split('.');

        return parseInt(arr[0] + arr[1]);
    }
})
// 全选按钮的状态
let AllChecked = computed({
    get() {
        if (data.value) {
            for (let i = 0; i < data.value.length; i++) {
                if (data.value[i].isChecked === false) {
                    return false;
                }
            };
            return true;
        }
    },
    set(val) {
        if (data.value) {
            for (let index in data.value) {
                // console.log(data.value[index]);
                data.value[index].isChecked = val;
            }
            // console.log(data.value);
        }
    }
});

// 删除数据
const removeShopCarList = (index) => {
    data.value.splice(index, 1);
}

// data数据发生变化时，设置storage
watch(() => data.value, (newVal, oldval) => {
    // console.log(newVal, oldval);
    that.$storage.setStorage("shopCarList", data.value);
    that.$store.commit("getGoodsLength");
}, { deep: true });

// 初始获取storage里的shopCarList
const dataWatcher = watchEffect(() => {
    data.value = that.$storage.getStorage("shopCarList");
    console.log('data.value---', data.value);
});

</script>

<style lang="scss" scoped>
.submitByMoney {
    margin-bottom: 50px;
}

.delete-button {
    height: 100%;
}

.oneShop {
    height: 100px;
    display: flex;
    margin-bottom: 10px;

    div {
        width: 185px;
    }

    .price {
        display: flex;
        flex-direction: column;
    }
}
</style>