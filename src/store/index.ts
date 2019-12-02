import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Rooters } from './types'
import { example } from './example/index';

Vue.use(Vuex);

const store: StoreOptions<Rooters> = {
    modules: {
        example
    }
}

export default new Vuex.Store<Rooters>(store) 