<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
    <div>
        <!-- 这是vue2的用法 -->
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->

        <router-view v-slot="{ Component }">
            <keep-alive exclude="user,shopcar">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style>
</style>
