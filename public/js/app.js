const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    search.value = null
    fetch(`/weather?location=${location}`)
    .then(res => res.json())
    .then(data => {
        if(data.error){
            console.log(data.error)
        }else{
            const resultDiv = document.querySelector('.result')
            resultDiv.innerHTML = `<ul>
                                        <li><b>Location</b>: ${data.location}</li>
                                        <li><b>Temperature</b>: ${data.temperature}</li>
                                        <li><b>Visibility</b>: ${data.visibility}</li>
                                        <li><b>Humidity</b>: ${data.humidity}</li>
                                        <li><b>Forecast</b>: ${data.forecast}</li>
                                    </ul>`
        }
    })
    .catch(err => console.log(err))

})

