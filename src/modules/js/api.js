let url = {
  hostLists: '/index/hotLists',
  bannerLists: '/index/banner',
  topLists: '/category/topList',
  rank:'/category/rank',
  subLists: '/category/subList',
  searchList: '/search/list'
}

// 开发环境和真实环境切换

let host = 'http://rap2api.taobao.org/app/mock/7058'



for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url