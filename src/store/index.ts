import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex';

interface IState {
  token: string;
}

// 定义 injection key
export const key: InjectionKey<Store<IState>> = Symbol('InjectionKey');

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}

export default createStore<IState>({
  state: {
    token: '',
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    LOGIN({ commit }, payload) {
      commit('SET_TOKEN', payload);
    },
  },
});
