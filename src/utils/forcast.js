const axios = require('axios')

const forcast = (lat, long, callback) =>{

   
    let URL = `http://api.weatherstack.com/current?access_key=8f5205f59c4b60624289722fc0082c6c&query=${lat},${long}`
    axios.get(URL)
    .then(res=>{
        callback(res.data)
    })
    .catch(err=> console.log(err))
}


module.exports = forcast 