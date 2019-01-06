import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart{
  static add(id){
    return fetch(url.addCart,{
      id,
      number: 1
    })
  }
  static reduce(id){
    return fetch(url.cartReduce,{
      id,
      number: 1
    })
  }
  static cartRemove(id){
    return fetch(url.cartRemove,{
      id,
    })
  }
  static removeArr(arr){
    let ids = []
    arr.map(good=>{
      ids.push(good.id)
    })
    return fetch(url.cartMremove,{ids})
  }
  static cartUpdate(id,number){
    return fetch(url.cartUpdate,{
      id,number
    })
  }
}

export default Cart