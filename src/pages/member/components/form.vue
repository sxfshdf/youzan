<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" 
            ref="user_name" 
            name="user_name" 
            v-model.trim="name" 
            maxlength="20"
            autocomplete="off"
            @focus="text">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" 
            name="tel" v-model="tel" maxlength="11" autocomplete="off"
            @focus="text">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue" @click="text">
              <option :value="-1">选择省份</option>
              <option 
                v-for="(province,index) in addressData.list" 
                :key="index"
                :value="province.value" >{{province.label}}
              </option>
            </select>
            <select class="js-city-selector" v-model="cityValue" @click="text">
              <option :value="-1">选择城市</option>
              <option 
                :value="city.value" 
                v-for="(city,index) in cityList" 
                :key="index">{{city.label}}
              </option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue" @click="text">
              <option :value="-1">选择地区</option>
              <option 
                :value="district.value" 
                v-for="(district,index) in districtList" 
                :key="index">{{district.label}}
              </option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" autocomplete="off"  @focus="text" name="address_detail" v-model.trim="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type === 'edit'" @click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type === 'edit'" @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
    <transition name="fade">
    <div class="motify" v-show="showErr">
      <div class="motify-inner">{{errMsg}}</div>
    </div>
    </transition>

     <!-- 删除弹窗 -->
    <transition name="fade">
      <div class="van-modal" style="z-index: 2000;" v-show="showPop"></div>
    </transition>
    <transition name="fade">
      <div class="van-dialog" style="z-index: 2001;" v-show="showPop"><!---->
        <div class="van-dialog__content">
          <div class="van-dialog__message">确定要删除地址吗？</div>
        </div>
        <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
          <button class="van-button van-button--default van-button--large van-dialog__cancel" style="" @click="removeCancel">
            <span class="van-button__text">
            取消</span>
          </button>
          <button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" @click="removeConfirm">
            <span class="van-button__text">
            确认</span>
          </button>
        </div>
      </div>
    </transition>
  </div>

 
</template>

<script src="./form.js"></script>


<style scoped>
  @import url('./address_base.css');
  @import url('./address.css');
</style>


