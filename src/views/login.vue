<template>
    <div>
        <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
        <van-form @submit="onSubmit(username, password)">
            <van-cell-group inset>
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { ref,getCurrentInstance } from 'vue';
import { Toast } from 'vant';

export default {
    name: 'login',
    setup() {
        // 给setup设置一个this，为that
        const that = getCurrentInstance().appContext.config.globalProperties

        // 路由返回上一级
        const onClickLeft = () => history.back();
        // 用户名
        const username = ref('');
        // 密码
        const password = ref('');
        // 登录提交按钮
        const onSubmit = (username, password) => {
            that.$http.post('login', { name: username, pwd: password })
                .then(res => {
                    // console.log(res);
                    if(res.code===1000){
                        Toast.success("登录成功");
                        that.$storage.setStorage("jwtToken",res.token);
                        that.$router.replace("/user");
                    }else{
                        Toast.fail(res.msg);
                    }
                })
        };

        return {
            onClickLeft,
            username,
            password,
            onSubmit,
        };
    },
}
</script>

<style lang="scss" scoped>
</style>