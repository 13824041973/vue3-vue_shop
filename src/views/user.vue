<template>
    <div>
        <!-- 已登录时 -->
        <template v-if="token">
            <p class="welcome">欢迎</p>
            <div class="goodsControl">
                <div>
                    <van-icon name="balance-pay" />
                    <div>待付款</div>
                </div>
                <div>
                    <van-icon name="records" />
                    <div>待接单</div>
                </div>
                <div>
                    <van-icon name="shop-collect-o" />
                    <div>待发货</div>
                </div>
                <div>
                    <van-icon name="logistics" />
                    <div>已发货</div>
                </div>
            </div>
            <div>
                <van-cell title="地址管理" icon="balance-pay" is-link />
                <van-cell title="我的积分" icon="records" is-link />
                <van-cell title="我的优惠券" icon="shop-collect-o" is-link />
                <van-cell title="我收到的礼物" icon="logistics" is-link />
            </div>
            <div>
                <van-button @click="quit" type="danger" size="large">退出登录</van-button>
            </div>
        </template>
        <!-- 未登录时 -->
        <div v-else class="noLogin">
            <van-button size="mini" type="success">注册</van-button>
            <div>已有账号?<router-link to="/login">登录</router-link></div>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue"
import { ref,getCurrentInstance } from "vue"
export default {
    name:'user',
    components: { tabbar },
    setup() {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties

        let token = ref(false);
        // 退出账号 方法
        const quit = ()=>{
            that.$storage.removeStorage('jwtToken');
            that.$router.replace('/login');
        };
        return {
            token,//localStorage 里的jwtToken
            quit,//退出账号 方法
        }
    },
    created() {
        if (this.$storage.getStorage('jwtToken')) {
            this.token = true;
        }else{
            this.token=false;
        }
    }
}
</script>

<style lang="scss" scoped>
.welcome {
    text-align: center;
    line-height: 200px;
    font-size: 16px;
    width: 375px;
    height: 200px;
    background-color: yellowgreen;
}

.goodsControl {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}

.noLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 667px;

    div {
        margin-top: 20px;
    }
}
</style>