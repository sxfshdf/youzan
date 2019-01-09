<template>
  <div class="container " style="min-height: 597px;">
    <!-- <div class="loading-more" v-if="loading"><span></span></div> -->
    <div class="empty-list" v-if="loading">
        <h2>未添加任何地址T.T</h2>
        <div class="desc">快去添加吧</div>
      </div>
    <div v-else>
      <div class="block-list address-list section section-first js-no-webview-block"  v-if="lists&&lists.length">
        <a class="block-item js-address-item address-item " 
          @click="toEdit(list)"
          v-for="list in lists" :key="list.id"
          :class="{'address-item-default':list.isDefault}">
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
          <a class="address-edit" >修改</a>
        </a>
      </div>
      
      
    </div>
    <div class="block stick-bottom-row center">
        <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
          :to="{
            name: 'form',
            query:{
              type: 'add',
            }
          }">
            新增地址
        </router-link>
      </div>
  </div>
</template>

<script>

import Address from 'js/addressService.js'

import url from 'js/api.js'
import axios from 'axios'

export default {
  data(){
    return {
      // lists: null,
      // loading: false
    }
  },
  computed:{
    lists(){
      return this.$store.state.lists
    },
    loading(){
      if(this.lists && this.lists.length){
        return false
      }else{
        return true
      }
    },
    // isEmpty(){
    //   if(this.lists && this.lists.length){
    //     return false
    //   }else{
    //     return true
    //   }
    // }
  },
  created(){
    // this.loading = true
    // this.getLists()
    if(!this.lists){
      this.$store.dispatch('getLists')
    }
  },
  methods:{
    toEdit(list){
      // this.$router.push({path:'/address/form'})
      this.$router.push({name: 'form', query:{
        type: 'edit',
        instance: list
        }
      })
    },
    // getLists(){
    //   // Address.list().then(res => {
    //   //   this.lists = res.data.lists
    //   //   console.log(this.lists)
    //   // })
    //   axios.get(url.addressLists).then(res => {
    //     this.lists = res.data.lists
    //     this.loading = false
    //   })
    // }
  }
}
</script>


<style scoped>
  @import url('./address_base.css');
  @import url('./address.css');




</style>

