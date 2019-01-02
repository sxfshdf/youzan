import 'css/common.css'
import './search.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin.js'
// import Velocity from 'velocity-animate'
import $ from 'jquery'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll)


let {keyword,id} = qs.parse(location.search.substring(1))
console.log({keyword,id})

new Vue({
  el: '.container',
  data:{
    searchList: null,
    keyword,
    isShow: false,
    // pageNum: 1,
    // pageSize: 8,
    // allLoaded: false,
    // loading: false
  },
  created(){
    this.getSearchList()
    window.addEventListener('scroll', this.move)
  },
  methods:{
    getSearchList(){
      if(this.allLoaded) return 
      this.loading = true
      axios.get(url.searchList, { keyword,id,}).then(res=>{
        // pageNum: this.pageNum, pageSize:this.pageSize
        // let currentList = res.data.lists
        // if(currentList.length < this.pageSize){
        //   this.allLoaded = true
        // }
        // if(this.searchList){
        //   this.searchList = this.searchList.concat(currentList)
        // }else{
        //   this.searchList = currentList
          this.searchList = res.data.lists
        // }
        // this.pageNum ++
        // this.loading = false
      })
      
    },
    move(){
      if(window.scrollY > 100){
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    toTop(){
      $('html, body').animate({scrollTop: 0},300)
    }
  },
  mixins:[mixin]
})

