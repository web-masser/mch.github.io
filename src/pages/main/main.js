import Vue from 'vue'
import App from './secondHand.vue'
import router from './router'
import store from '@/store'
import NutUI from '@nutui/nutui';
import VConsole from 'vconsole'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// new VConsole()

router.beforeEach((to, from, next) => {
    if (to.name) next()
    else {
        try {
            const params = to.fullPath.split("?")[1]
            const data = params != undefined ? params : ''
            next({
                path: "index?" + data
            })
        } catch (err) {
            next({
                name: "index"
            })
        }
    }
})

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')