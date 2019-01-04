import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import './cart_transition.css'

import axios from 'axios'
import url from 'js/api.js'
import Vue from 'vue'
import mixin from 'js/mixin.js'

new Vue({
  el: '.container',
  data:{
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    showPop: false,
    removeData: null
  },
  computed:{
    allSelected:{
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return true
      },
      set(newVal){
        this.lists.map(shop => {
          shop.checked = newVal
          shop.goodsList.map(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected:{
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop){
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.map(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectedLists(){
      if(this.lists && this.lists.length){
        let array = []
        let total = 0
        this.lists.map(shop => {
          shop.goodsList.map(good => {
            if(good.checked){
              array.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return array
      }
      return []
    },
    removeLists(){
      if(this.editingShop){
        let array = []
        this.editingShop.goodsList.map(good => {
          if(good.removeChecked){
            array.push(good)
          }
        })
        return array
      }
      return []
    },
  },
  created(){
    this.getLists()
  },
  methods:{
    getLists(){
      axios.get(url.cartList).then(res => {
        let lists = res.data.cartList
        lists.map(shop => {
          shop.checked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.removeChecked = false
          shop.goodsList.map(good => {
            good.checked = false
            good.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop,good){
      let attribute = this.editingShop ? 'removeChecked' : 'checked'
      good[attribute] = !good[attribute]
      shop[attribute] = shop.goodsList.every(good => {
        return good[attribute]
      })
    },
    selectShop(shop){
      let attribute = this.editingShop ? 'removeChecked' : 'checked'
      shop[attribute] = !shop[attribute]
      shop.goodsList.map(good => {
        good[attribute] = shop[attribute]
      })
    },
    selectAll(){
      let attribute = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attribute] = !this[attribute]
    },
    edit(shop,shopIndex){
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.map((item,index) => {
        if(shopIndex !== index){
          item.editing = false
          item.editingMsg = item.editingMsg ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    add(good){
      axios.post(url.addCart,{
        id: good.id,
        number: 1
      }).then(res=>{
        good.number++
      })
    },
    reduce(good){
      if(good.number === 1) return
      axios.post(url.cartReduce,{
        id: good.id,
        number: 1
      }).then(res=>{
        good.number--
      })
    },
    remove(shop,shopIndex,good,goodIndex){
      this.showPop = true
      this.removeData = {shop,shopIndex,good,goodIndex}
    },
    removeConfirm(){
      let {shop,shopIndex,good,goodIndex} = this.removeData
      axios.post(url.cartRemove,{
        id: good.id
      }).then(res => {
        shop.goodsList.splice(goodIndex,1)
        if(!shop.goodsList.length){
          this.lists.splice(shopIndex,1)
          this.removeShop()
        }
        this.showPop = false
      })
    },
    removeShop(){
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.map(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    }
  },
  mixins:[mixin]
})
