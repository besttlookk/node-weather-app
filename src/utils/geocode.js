const axios = require('axios')

const geocode = (location, callback)=>{
    
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYmVzdHRsb29rayIsImEiOiJja2RxeXFtOTQwbnVsMnhtc2pxczlxcGk1In0.cpWuBVEbXY88AJmA6NcelA&limit=1`)
    .then(res => {

        if(res.error){
            return console.log('error in geocode')
        }
        
        long = res.data.features[0].center[0]
        lat = res.data.features[0].center[1]
    
        return callback(lat, long)
    })
    .catch(err => console.log(err))
    
}

module.exports = geocode