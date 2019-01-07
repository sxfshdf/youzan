import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import './cart_transition.css'

import axios from 'axios'
import url from 'js/api.js'
import Vue from 'vue'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'


new Vue({
  el: '.container',
  data:{
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    showPop: false,
    removeData: null,
    removeMsg: null,
    editing: false,
    loading: false
  },
  computed:{
    allSelected:{
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
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
    this.loading = true
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
        this.loading = false
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
      // axios.post(url.addCart,{
      //   id: good.id,
      //   number: 1
      // }).then(res=>{
      //   good.number++
      // })
      Cart.add(good.id).then(res=>{
        good.number++
      })
    },
    reduce(good){
      if(good.number === 1) return
      // axios.post(url.cartReduce,{
      //   id: good.id,
      //   number: 1
      // }).then(res=>{
      //   good.number--
      // })
      Cart.reduce(good.id).then(red=>{
        good.number--
      })
    },
    remove(shop,shopIndex,good,goodIndex){
      this.showPop = true
      this.removeData = {shop,shopIndex,good,goodIndex}
      this.removeMsg = '确定删除该商品吗？'
    },
    removeList(){
      this.showPop = true
      this.removeMsg = `确定将所选${this.removeLists.length}个商品删除吗？`
    },
    removeConfirm(){
      if(this.removeMsg === '确定删除该商品吗？'){
        let {shop,shopIndex,good,goodIndex} = this.removeData
        // axios.post(url.cartRemove,{
        //   id: good.id
        // }).then(res => {
        //   shop.goodsList.splice(goodIndex,1)
        //   if(!shop.goodsList.length){
        //     this.lists.splice(shopIndex,1)
        //     this.removeShop()
        //   }
        //   this.showPop = false
        // })
        Cart.cartRemove(good.id).then(res=>{
          shop.goodsList.splice(goodIndex,1)
          if(!shop.goodsList.length){
            this.lists.splice(shopIndex,1)
            this.removeShop()
          }
          this.showPop = false
        })
      }else{
        Cart.removeArr(this.removeLists).then(res => {
          let array = []
          this.editingShop.goodsList.map(good=>{
            let index = this.removeLists.findIndex(list=>{
              return list.id === good.id
            })
            if(index === -1){
              array.push( good )
            }
          })
          if(array.length){
            this.editingShop.goodsList = array
          }else{
            this.lists.splice(this.editingShopIndex,1)
            this.removeShop()
          }
          this.showPop = false
        })
        // let ids = []
        // this.removeLists.map(good => {
        //   ids.push(good.id)
        // }) 
        // axios.post(url.cartMremove,{ids}).then(res=>{
        //   let array = []
        //   this.editingShop.goodsList.map(good=>{
        //     let index = this.removeLists.findIndex(list=>{
        //       return list.id === good.id
        //     })
        //     if(index === -1){
        //       array.push( good )
        //     }
        //   })
        //   if(array.length){
        //     this.editingShop.goodsList = array
        //   }else{
        //     this.lists.splice(this.editingShopIndex,1)
        //     this.removeShop()
        //   }
        //   this.showPop = false
        // }) 
      }
    },
    removeCancal(){
      this.showPop = false
    },
    removeShop(){
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.map(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    update(good){
      console.log(good.number)
      good.number = good.number.replace(/\D/g,'')
      Cart.cartUpdate(good.id,good.number).then(res=>{
        
      })
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex){
      let endX = e.changedTouches[0].clientX
      let left = '0px'
      if(good.startX - endX > 100){
        left = '-60px'
      }else if(endX - good.startX >100){
        left='0px'
      }
      if(!this.editingShop){
        Velocity(this.$refs[`good-${shopIndex}-${goodIndex}`],{
          left
        })
      }
      
    }
  },
  mixins:[mixin]
})
