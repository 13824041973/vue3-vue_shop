import { router } from '.'

export const routes = [
    {
        path: '/',
        name:'login',
        alias:'/login',
        component: () =>
            import('@/views/login.vue')
    },
    {
        path:'/user',
        name:'user',
        component:()=>
            import("@/views/user.vue")
    },
    {
        path:'/home',
        name:'home',
        component:()=>
            import("@/views/home.vue")
    },
    {
        path:'/list',
        name:'list',
        props:(route)=>{
            return {
                index:route.query.index
            }
        },
        component:()=>
            import("@/views/list.vue")
    },
    {
        path:'/shopcar',
        name:'shopcar',
        component:()=>
            import("@/views/shopcar.vue")
    },
    {
        path:'/details',
        name:'details',
        props:(route)=>{
            return {
                id:route.query.id
            }
        },
        component:()=>
            import("@/views/details.vue")
    }
]