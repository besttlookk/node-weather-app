// express is generalu a function, as apposed to object
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode');
const forcast = require('../src/utils/forcast');

const app = express()

const port = process.env.PORT || 3000

//=============================define paths for express config
const publicDirPath = path.join(__dirname,'../public')
// customizing the views directory
const viewsPath = path.join(__dirname, '../templates/views')  // now we need to tell express by using app.set
const partialsPath = path.join(__dirname, '../templates/partials')


//============================setup handlebars enguine and views location
// if we are using tenplate engine..we need to tell express which template enguine we are using
app.set('view engine', 'hbs');  // folder name shoulc be 'views' in root folder
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)



// ==========================setup stctic directory to serve
app.use(express.static(publicDirPath))

// making route for dyanmic files
app.get('/',(req, res)=>{
    // render help us to render all our views
    // no need to write the extension
    // it will automatically look into views folder..
    // render takes two argument. 1st- name of the view  / 2nd- object
    res.render('index', {title:'Weather App', name: "Prabhash"})
})

app.get('/about',(req, res)=>{
    res.render('about',{title:"About", name:"Prabhash"})
} )

app.get('/help', (req, res)=>{
    res.render('help',{title:'Help', message:"We are here to help you", name: "Prabhash"})
})


// json based endpoint
app.get('/weather', (req, res)=>{
    if(!req.query.location){
        // function stops here
        return res.send({error: "You must provide the location"})
    }
    geocode(req.query.location, ()=>{
   
        forcast(lat, long, (data)=>{

            const {current, location} = data
            // send JSON
            res.send({
                location: location.name,
                Temperature: `${current.temperature} celsius`,
                Visibility: `${current.visibility} kms/hr`,
                Humidity: `${current.humidity}`,
                forecast: current.weather_descriptions[0]
            })
        })
    })
  
})




app.get('/products', (req, res)=>{
    if(!req.query.search){
        // to stop the program to run after this block so that we only send respond once
         return res.send({
            error:"Your must provide the search term"
        })
    }
    console.log(req.query) // we get the query string as object[parsed by the express]
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {errorMessage: "Help article not found", title: 404, name: 'Prabhash'})
})

// this should be kept last
app.get('*', (req, res)=>{
    res.render('404', {errorMessage: "Page Not Found", title: 404, name: 'Prabhash'})
})



app.listen(port, ()=>{
    console.log("server running on port " + port)
})