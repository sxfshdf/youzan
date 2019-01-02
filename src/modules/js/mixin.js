import Foot from 'components/Foot.vue'

let mixin = {
  filters:{
    formatPrice(price){
      if(!price) return '0.00'
      //取整数
      let intPart = parseInt(price,10) 
      // 整数部分逢三一断
      let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

      let array = price.toString().split('.')
      if(array.length === 2){
        // 原来的数据有小数点 获取小数后面的数据
        let value = array[1]
        if(value.length===1){
          return intPartFormat + '.' + value + '0'
        }else{
          return intPartFormat + '.' + value
        }
      }else{
        return intPartFormat + '.00'
      }
    }
  },
  components:{
    Foot
  }
}

export default mixin