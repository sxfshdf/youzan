import axios from 'axios'
// import url from 'js/api.js'

function fetch(url,data){
  return new Promise((resolve,reject)=>{
    axios.post(url,data).then(res => {
      // if(res.data.status === 200){
        resolve(res)
      // }
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch