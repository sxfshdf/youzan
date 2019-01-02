import 'css/common.css'
import './category.css'
import Vue from 'vue'

import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'

// import Foot from 'components/Foot.vue'
import { Loadmore } from 'mint-ui'
Vue.use(Loadmore)

new Vue({
  el: '#app',
  data:{
    topLists: null,
    topIndex: 0,
    subLists: null,
    rankLists: null
  },
  components: {
  //  Foot
  },
  created(){
    this.getTopLists()
    this.getSubLists(0)
  },
  methods:{
    getTopLists(){
      axios.get(url.topLists).then(res=>{
        this.topLists = res.data.lists
      })
    },
    getSubLists(index,id){
      this.topIndex = index
      if(index === 0){
        this.getRank()
      }else {
        axios.get(url.subLists,{id}).then(res=>{
          this.subLists = res.data.data
        })
      }
    },
    getRank(){
      axios.get(url.rank).then(res=>{
        console.log(res)
        this.rankLists = res.data.data
      })
    },
    toSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  mixins: [mixin]
  // filters:{
  //   formatPrice(price){
  //     if(!price) return '0.00'
  //     //取整数
  //     let intPart = parseInt(price,10) 
  //     // 整数部分逢三一断
  //     let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  //     let array = price.toString().split('.')
  //     if(array.length === 2){
  //       // 原来的数据有小数点 获取小数后面的数据
  //       let value = array[1]
  //       if(value.length===1){
  //         return intPartFormat + '.' + value + '0'
  //       }else{
  //         return intPartFormat + '.' + value
  //       }
  //     }else{
  //       return intPartFormat + '.00'
  //     }
  //   }
  // }
})