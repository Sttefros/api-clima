const API_KEY = "8aea14f85057ca62017c0e9098e7ecc2";
const idioma = "es";
// -33.59153394342312, -70.69191626842155

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=${idioma}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
        
		
		

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=${idioma}`)
        .then(response1 => response1.json())
        .then(data1 =>{
            for(i=0;i<5;i++){
                document.getElementById("descriptions" + (i+1)).innerHTML =  data1.list[i].weather[0].description;
            }
            for(i=0;i<5;i++){
                document.getElementById("day" + (i+1)+"Min").innerHTML = "Min:" + Number(data1.list[i].main.temp_min -265.2).toFixed(1)+"°";
            }
            for(i=0;i<5;i++){
                document.getElementById("day" + (i+1)+"Max").innerHTML = "Max:" + Number(data1.list[i].main.temp_max -265.2).toFixed(1)+"°";
            }
            //Getting Weather Icons
            for(i = 0; i<5; i++){
                document.getElementById("icon" + (i+1)).src = "http://openweathermap.org/img/wn/"+
                data1.list[i].weather[0].icon
                +"@2x.png";
    }
        });
        // .then(datas => setWeatherDatas(datas));
        // .then(data1 => console.log(data1));
}





const setWeatherData = data  => {
	
	
    const weatherData = {
        location: data.name,
        country: data.sys.country,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
        hour: getHour(),
		icon: data.weather[0].icon,
    }
	
	
			

	

    Object.keys(weatherData).forEach(key => {
		document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + weatherData[key].icon  + ".png";
        document.getElementById(key).textContent = weatherData[key];
    });



    clearUp();
}


const clearUp = () => {

    let loader = document.getElementById('loader');
	let app = document.getElementById('app');
    loader.style.display = 'none';
	app.style.display = 'block';
}

const getDate = () => {
    let date = new Date();
	return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;

}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

const getHour = () => {
    const today = new Date();

    return `${today.toLocaleTimeString('es-CL')}`
}