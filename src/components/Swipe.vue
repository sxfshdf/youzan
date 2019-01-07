<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- <div class="loading-more" v-if="loading"><span></span></div> -->
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
    },
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

<style>
@import url('swiper/dist/css/swiper.css');
   
  .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
}
/*
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}*/
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #f44;
} 
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }

.loading-more {
  width: 100%;
  padding: 20px 10px;
  vertical-align: middle;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 20px;
  box-sizing: border-box
}


.loading-more span {
  display: inline-block;
  margin-top: 10px;
  width: 16px;
  height: 16px;
  background: url("/v2/image/loader.gif") no-repeat 50%;
  background-size: 16px 16px
}

@media only screen and (-webkit-min-device-pixel-ratio:1.5),
only screen and (min--moz-device-pixel-ratio:1.5),
only screen and (min-device-pixel-ratio:1.5) {
  .loading-more span {
    background-image: url("/v2/image/loader@2x.gif")
  }
}
</style>
