/* Global Variables */
const apiKey = 'c4fbf63796ec8738faf7bea59de8f66a&units=imperial';
const url = "https://api.openweathermap.org/data/2.5/weather?zip="
const server = "http://127.0.0.1:4000"

// Create a new date instance dynamically with JS
let d = new Date()
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
let newDate = new Intl.DateTimeFormat('en-US', options).format(d)

document.getElementById('generate').addEventListener('click', function () {
    let zipCode = document.getElementById('zip').value
    let feelings = document.getElementById('feelings').value

    if(!zipCode) {
        document.getElementById('error').innerText = 'Please enter your zip code!!'
    }else{
        document.getElementById('error').innerText = ''
        // get weather data 
        getData(zipCode).then(val => {
            let temp = Math.round(val.main.temp)
            let description = val.weather[0].description
            let city = val.name
            const objVal = {
                temp,
                description,
                city,
                feelings,
                newDate
            }
            console.log('objVal: ', objVal)
            // post data
            postData(`${server}/add-weather`, objVal)
            // render UI
            retrieveData()
        })
    }
})



const getData =  async (zipCode) => {
  const res = await fetch(`${url}${zipCode},us&appid=${apiKey}`)
  try {
      const data = await res.json()
      return data 
  } catch (error) {
      console.log('error: ', error)
  }
}

const postData = async (url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error: ', error)
    }
}

const retrieveData = async () => {
   const res = await fetch(`${server}/get-weather`)
   try {
       const data = await res.json()
       document.getElementById('date').innerText = data.newDate
       document.getElementById('temp').innerText = data.temp
       document.getElementById('description').innerText = data.description
       document.getElementById('content').innerText = data.feelings
       document.getElementById('city').innerText = data.city
   } catch (error) {
       console.log('error: ', error)
   }
}