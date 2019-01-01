import 'css/common.css'
import './index.css'
import Vue from 'vue'

import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll)

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists: null
  },
  components:{
    Foot,Swipe
  },
  methods: {
    getData(){
      //判断是否加载完毕，
      if(this.allLoaded) return
      this.loading = true
      axios.get(url.hostLists,{
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res=>{
        let currentLists = res.data.lists
        // 判断所有数据是否已经加载完毕
        if(currentLists.length < this.pageSize){
          this.allLoaded = true
        }
        if(this.lists){
          this.lists = this.lists.concat(currentLists)
        }else{
          // 第一次请求数据，初始化
          this.lists = currentLists
        }
        this.pageNum++
        this.loading = false
      })
    },
    getBanner(){
      axios.get(url.bannerLists).then(res=>{
        this.bannerLists = res.data.lists
      })
    }
  },
  created(){
    this.getData()
    this.getBanner()
  }
})