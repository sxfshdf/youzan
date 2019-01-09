
import Address from 'js/addressService.js'
import axios from 'axios'
import url from 'js/api.js'


// 1. 使用 vuex 插件

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 2. 创建 Stroe 实例

let store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state,lists) {
      state.lists = lists
    },
    add(state,instance) {
      state.lists.push(instance)
    },
    remove(state,id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index,1)
    },
    update(state,instance) {
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id === instance.id
      })
      Object.assign(lists[index] , instance)
      state.lists = lists
    },
    setDefault(state,id){
      let lists = state.lists
      lists.forEach(item => {
        if(item.id === id) {
          item.isDefault = true
        }else{
          item.isDefault = false
        }
      })
    }
  },
  actions: {
    getLists({commit}) {
      axios.get(url.addressLists).then(res => {
        commit('init',res.data.lists)
      })
    },
    addAddress({commit},instance) {
      // 模拟添加 id，其实 instance 最好后台返回
      instance.id = parseInt(Math.random()*10000)
      Address.add(instance).then(res => {
        commit('add',instance)
      })
    },
    removeAddress({commit}, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    updateAddress({commit}, instance) {
      Address.update(instance).then(res => {
        commit('update',instance)
      })
    },
    setDefaultAdd({commit}, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault',id)
      })
    }
  }
})

export default store