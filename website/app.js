let date = new Date()
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
let newDate = new Intl.DateTimeFormat('en-US', options).format(date) 


const url = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "c4fbf63796ec8738faf7bea59de8f66a"
const server = "http://127.0.0.1:4000"


document.getElementById("generate").addEventListener("click", function () {
  const zipCode = document.getElementById("zip").value
  const feelings = document.getElementById("feelings").value
  if(!zipCode){
    alert('Please enter a zip code')
  }else{
    getWeatherData(zipCode).then((data) => {
      if (data) {
        const temp = data.main.temp
        const city = data.name
        const description = data.weather[0].description
        sendData(server + "/add-weather", {
          newDate,
          city,
          temp, 
          description,
          feelings
        })
        renderUI()
      }
    })
  }
})

const getWeatherData = async (zipCode) => {
  try {
    const res = await fetch(`${url}${zipCode},us&appid=${apiKey}`)
    const data =  await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

async function sendData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  try {
    const data = await response.json() 
    console.log('data: ', data)
    return data 
  } catch (error) {
    console.log('error: ', error)
  }
}

const renderUI = async () => {
  const response = await fetch(server + "/get-weather")
  try {
    const data = await response.json()
    document.getElementById("date").innerHTML = data.newDate
    document.getElementById("city").innerHTML = data.city
    document.getElementById("temp").innerHTML = `${data.temp}&degC`
    document.getElementById("description").innerHTML = data.description
    document.getElementById("content").innerHTML = data.feelings
  } catch (error) {
    console.log(error)
  }
}
