<template>
    <div>
        <!-- navbar 导航栏 -->
        <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />

        <!-- 大图片 -->
        <van-image v-if="data.value" :src="$restUrl(data.value.image1)" />

        <!-- 文字介绍 -->
        <div class="text" v-if="data.value">
            <p>{{ data.value.name }}</p>
            <p>价格:￥{{ data.value.presentPrice }}</p>
        </div>

        <!-- 图片介绍详情 -->
        <div v-if="data.value">
            <!-- 文字 -->
            <div class="textDeatil">
                <p>商品介绍</p>
            </div>
            <!-- 图片 -->
            <div v-html="data.value.detail"></div>
        </div>

        <!-- 付款动作栏 actionBar -->
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="cart-o" text="购物车" :badge="goodsLength" to="/shopcar" />
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-button type="danger" text="立即购买" @click="toShop" />
        </van-action-bar>

        <!-- sku 弹出框，用于加入购物车 -->
        <van-action-sheet v-model:show="show">
            <div class="sku">
                <!-- 上半部分 -->
                <div class="skuTop">
                    <van-image width="100" height="100" :src="$restUrl(data.value.image1)" />
                    <div>
                        <p>{{ data.value.name }}</p>
                        <p>￥{{ skuCurrentData.value.price }}</p>
                    </div>
                </div>
                <!-- 下半部分 -->
                <div class="skuBottom">
                    <p>商品的规格:</p>
                    <div class="btn">
                        <van-button round v-if="data.value.type" v-for="(item, index) in data.value.type"
                            :class="{ 'selectIngBtn': skuCurrentIndex === index }"
                            @click="skuCurrentChange(item, index)">
                            {{ item.name }}</van-button>
                    </div>
                    <van-button @click="addShopCar" color="linear-gradient(to right, #ff6034, #ee0a24)" block>添加到购物车
                    </van-button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { getCurrentInstance, onActivated, reactive, ref, toRefs } from 'vue'
import { mapMutations, useStore } from 'vuex';
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties
        // 导航栏navbar的返回上级
        const onClickLeft = () => history.back();


        // 父传子进来的id，用于获取详情页的数据赋值给(data)
        const { id } = toRefs(props);
        // 详情页的数据
        const data = reactive({});
        // 购物车商品数量
        const store = useStore();
        const getGoodsLength = mapMutations(["getGoodsLength"]).getGoodsLength.bind({
            $store: store,
        });
        getGoodsLength();
        // that.$store.commit("getGoodsLength");//vue2写法
        const goodsLength = ref(store.state.goodsLength);


        // sku弹出框是否显示的show状态
        let show = ref(false);
        // 立即购买按钮的方法
        const toShop = () => {
            show.value = !(show.value)
        };

        // sku选项默认的初始值
        let skuCurrentIndex = ref(0);
        // sku选中项的数据
        let skuCurrentData = reactive({});
        // 选中项的所有数据
        let currentAllData = reactive({});

        // 切换sku选项时的方法
        const skuCurrentChange = (item, index) => {
            // 切换按钮的背景色
            skuCurrentIndex.value = index;
            let type = reactive({ type: data.value.type[index].name });
            // let skuCurrentItem = reactive({});
            let skuCurrentItem = data.value.skuComb.filter((items) => item.id === items.s1)
            // sku选中项的数据
            skuCurrentData.value = Object.assign({}, skuCurrentItem[0], type);
            console.log('选中项的数据---', skuCurrentData.value);
        };

        // 添加到购物车
        const addShopCar = () => {
            currentAllData.value = Object.assign({}, {
                id: data.value.id,
                name: data.value.name,
                num: 1,
                image: data.value.pictureComperssPath,
                isChecked: false,
                sku: skuCurrentData.value,
            });
            // 当前所选项的对象的所有属性
            // console.log('currentAllData---', currentAllData.value);
            handleShopCarList(currentAllData.value);
            that.$store.commit("getGoodsLength");
            goodsLength.value = that.$store.state.goodsLength;
        };

        // 处理购物车列表数据
        const handleShopCarList = (item) => {
            // 把单个商品整合成数组
            let shopCarList = that.$storage.getStorage("shopCarList") || [];
            if (shopCarList.length === 0) {
                // 空数组
                shopCarList.push(item);
                that.$storage.setStorage("shopCarList", shopCarList);
            } else {
                // 非空数组
                let newArr = shopCarList.filter((thisArr) => {
                    return thisArr.id === item.id && thisArr.sku.id === item.sku.id
                });
                // 有相同数据时
                if (newArr.length) {
                    // console.log('newArr---',newArr);
                    newArr[0].num++;
                    shopCarList.concat(newArr);
                    // console.log('shopCarList---', shopCarList);
                } else {
                    // 没有相同数据时
                    shopCarList.push(item);
                }
                that.$storage.setStorage("shopCarList", shopCarList);
            }
            Toast('添加成功');
            show.value = !(show.value);
        }


        // 组件激活时，去请求详情页数据,需要父传子进来的id
        onActivated(async () => {
            await that.$http.post('goods/getDetailGoodsInfo', { goodsId: id.value })
                .then(res => {
                    data.value = res.data;
                    console.log('data---', data.value);
                });

            // 给skuCurrentData赋初始值
            let skuCurrentItem = data.value.skuComb.filter((items) => data.value.type[0].id === items.s1);
            skuCurrentData.value = Object.assign({}, skuCurrentItem[0], { type: data.value.type[0].name });
            console.log('当前选中项的数据 skuCurrentData---', skuCurrentData.value);


        });

        return {
            onClickLeft,
            data,
            show,
            toShop,
            skuCurrentIndex,
            skuCurrentData,
            skuCurrentChange,
            addShopCar,
            goodsLength,
        }
    },
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 20px;
}

.textDeatil {
    font-size: 20px;
    color: #ff0000;
    text-align: center;
    border-bottom: 1px solid #ff0000;
}

.sku {
    padding: 20px;

    .skuTop {
        display: flex;
        border-bottom: 1px solid rgb(211, 207, 207);
        font-size: 16px;
    }

    .skuBottom {
        font-size: 14px;

        .btn {
            display: flex;
            justify-content: space-around;
            margin-bottom: 40px;

            button {
                width: 77px;
            }

            .selectIngBtn {
                background-color: pink;
            }
        }
    }
}
</style>