import { InjectionKey } from 'vue';
import { Store, createStore, useStore as baseUseStore } from 'vuex';
import { getRoomList } from '@/api';

export interface IRoom {
  id: number;
  image: string;
  title: string;
  desc: string;
}

interface IState {
  token: string;
  roomList: IRoom[];
}

// 定义 injection key
export const key: InjectionKey<Store<IState>> = Symbol('InjectionKey');

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}

export default function createSSRStore() {
  return createStore<IState>({
    state: {
      token: '',
      roomList: [],
    },
    mutations: {
      SET_TOKEN(state, payload) {
        state.token = payload;
      },
      SET_ROOM_LIST(state, payload) {
        state.roomList = payload;
      },
    },
    actions: {
      LOGIN({ commit }, payload) {
        commit('SET_TOKEN', payload);
      },
      GET_ROOM_LIST({ commit }) {
        return getRoomList().then((res) => {
          return commit('SET_ROOM_LIST', res);
        });
      },
    },
  });
}
