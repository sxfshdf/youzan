<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

// var swiper = new Swiper('.swiper-container', {
//       pagination: {
//         el: '.swiper-pagination',
//       },
//     });


export default {
  name: 'Swipe',
  data() {
    return {

    }
  },
  props:{
    lists:{
      type: Array,
      required: true
    }
  },
  components: {

  },
  mounted(){
    new Swiper('.swiper-container',{
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true,
      autoplay: {
        delay: 3000,
      },
      speed: 300,
    })
  }
}
</script>

<style scoped>
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }

</style>
