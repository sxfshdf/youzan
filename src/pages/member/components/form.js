import Address from 'js/addressService.js'
import $ from 'jquery'

export default {
  data(){
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: this.$route.query.type,
      instance: this.$route.query.instance,
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null,
      showErr: false,
      errMsg:'',
      showPop: false
    }
  },
  methods:{
    add(){
      var reg = /^1[0-9]{10}$/
      if(!this.name){
        this.showErr = true
        this.errMsg = '收货人不能为空'
        this.inputWrong = true
        $("input[name='user_name']").addClass('invalid').siblings('.invalid').removeClass('invalid')
        return
      }
      if(!this.tel){
        this.showErr = true
        this.errMsg = '联系电话不能为空'
        $("input[name='tel']").addClass('invalid').siblings('.invalid').removeClass('invalid')
        return
      }else if(!reg.test(this.tel)){
        this.showErr = true
        this.errMsg = '号码格式有误'
        $("input[name='tel']").addClass('invalid').siblings('.invalid').removeClass('invalid')
        return
      }
      if(this.provinceValue ===-1 || this.cityValue === -1 || this.districtValue === -1){
        this.showErr = true
        this.errMsg = '请选择地区'
        $("select").addClass('invalid')
        return
      }
      if(!this.address){
        this.showErr = true
        this.errMsg = '请输入详细地址'
        $("input[name='address_detail']").addClass('invalid').siblings('.invalid').removeClass('invalid')
        return
      }
      let {id,name,tel,provinceValue,cityValue,districtValue,address} = this
      let data = {id,name,tel,provinceValue,cityValue,districtValue,address}
      if(this.type === 'add'){
        Address.add(data).then(res => {
          this.$router.go(-1)
        })
      }
      if(this.type === 'edit'){
        Address.update(data).then(res => {
          this.$router.go(-1)
        })
      }
      
    },
    text(){
      $("input").removeClass('invalid')
      this.showErr = false
    },
    // hideErr(){
    //   setTimeout(()=>{
    //     this.showErr = false
    //   },1000)
    // }
    remove(){
      this.showPop = true
    },
    removeConfirm(){
      Address.remove(this.id).then(res => {
        this.showPop = false
        this.$router.go(-1)
      })
    },
    removeCancel(){
      this.showPop = false
    },
    setDefault(){
      Address.setDefault(this.id).then( res => {
        this.$router.go(-1)
      })
    }
  },
  created(){
    if(this.type === 'edit'){
      this.provinceValue = parseInt(this.instance.provinceValue)
      this.name = this.instance.name
      this.tel = this.instance.tel
      this.address = this.instance.address
      this.id = this.instance.id
    }
  },
  watch:{
    provinceValue(value){
      if(value === -1) return  
      let index = this.addressData.list.findIndex(item => {
        return item.value === value
      })
      this.cityList = this.addressData.list[index].children
      this.cityValue = -1
      this.districtValue = -1

      if(this.type === 'edit'){
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue(value){
      if(value === -1) return 
      let index = this.cityList.findIndex(item => {
        return item.value === value
      })
      this.districtList = this.cityList[index].children
      this.districtValue = -1

      if(this.type === 'edit'){
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  }
}