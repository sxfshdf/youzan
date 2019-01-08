

import './goods_common.css' 
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from  'js/mixin.js'
import qs from 'qs'
import Swipe from 'components/Swipe.vue'
import $ from 'jquery'


let {id} = qs.parse(location.search.substring(1))
let detailTab = ['商品详情','本店成交']
new Vue({
  el: '#app',
  data:{
    id,
    details:null,
    detailTab,
    tabIndex: 0,
    dealLists: null,
    bannerLists: [],
    skuType: 1,
    showSku: false,
    skuNum: 1,
    showCartIcon: false,
    showMsg: false,
    isShow: false
  },
  components:{ Swipe },
  methods:{
    getDetail(){
      axios.get(url.details,{id}).then(res=>{
        this.details = res.data.data
        res.data.data.imgs.map(img=>{
          this.bannerLists.push({
            clickUrl: '#',
            img: img
          })
        })
        console.log(this.bannerLists)
      })
    },
    getDeals(){
      axios.get(url.deals,{id}).then(res=>{
        this.dealLists = res.data.data.lists
        
      })
    },
    changeTab(index){
      this.tabIndex = index
      if(index===1){
        this.getDeals()
      }
    },
    chooseSku(type){
      this.skuType = type
      this.showSku = true
    },
    changeNum(num){
      if(this.skuNum===1 && num<0) return 
      this.skuNum += num
    },
    addCart(){
      axios.post(url.addCart,{
        id,
        number: this.skuNum
      }).then(res=>{
        if(res.data.status===200){
          this.showSku = false
          this.showCartIcon = true
          

          // setTimeout(()=>{
            this.showMsg = true
          // },300)

          setTimeout(()=>{
            this.showMsg = false
          },800)
        }
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
      $('html,body').animate({scrollTop: 0},300)
    }
  },
  created(){
    this.getDetail()
    window.addEventListener('scroll',this.move)
  },
  watch:{
    showSku(val, oldVal){
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
      }
  },
  mixins:[mixin]
})
