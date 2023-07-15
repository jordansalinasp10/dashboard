
let plot = (data) => {
  const ctx = document.getElementById("chart1");
  const dataset = {
    labels: data.hourly.time /* ETIQUETA DE DATOS */,
    datasets: [
      {
        label: "Temperatura semanal" /* ETIQUETA DEL GRÁFICO */,
        data: data.hourly.temperature_2m /* ARREGLO DE DATOS */,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: dataset,
  };
  const chart = new Chart(ctx, config)
};

let loadcard = (data) => {

  let timezone =data['timezone']
  let temperatura = data.current_weather.temperature
  let velocidadViento= data.current_weather.windspeed
  let latitud = data['latitude']
  let fecha = data.current_weather.time
  document.querySelector('#timezone').textContent = timezone
  document.querySelector('#temperatura').textContent = temperatura + " °C"
  document.querySelector('#vientos').textContent = velocidadViento + "km/h"
  document.querySelector('#latitud').textContent = latitud 
  document.querySelector('#fecha').textContent = "Fecha y hora de actualización: " + fecha 
};

 let plot2 = (data) => {
  const ctx = document.getElementById("chart2");
 const dataset = {
    labels: data.daily.time /* ETIQUETA DE DATOS */,
     datasets: [
      {
      label: "UV" /* ETIQUETA DEL GRÁFICO */,
       data: data.daily.uv_index_max/* ARREGLO DE DATOS */,
        barThickness: 6,
         maxBarThickness: 8,
        minBarLength: 2,
      
      },
    ],
  };
  const config = {
     type: "bar",
    data: dataset,
  };
   const chart = new Chart(ctx, config)
 };
let load = (data) =>{
  let meteo = localStorage.getItem('meteo');
  if(meteo == null) {
    let URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&daily=uv_index_max&current_weather=true&timezone=auto";
        
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        load(data)

        /* GUARDAR DATA EN LA MEMORIA */
      localStorage.setItem("meteo", JSON.stringify(data))
    })
    .catch(console.error);

  } else {
    load(JSON.parse(meteo))
  }
};

let loadInocar = () => {
  let URL_proxy = 'https://cors-anywhere.herokuapp.com/';
  let URL = URL_proxy + 'https://www.inocar.mil.ec/mareas/consultan.php';
  fetch(URL)
     	.then(response => response.text())
        .then(data => {
           const parser = new DOMParser();
           const xml = parser.parseFromString(data, "text/html");
           console.log(xml);
      
           let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
           let contenedorHTML = document.getElementById("cont-tabla");
           contenedorHTML.innerHTML = contenedorMareas.innerHTML;
        })
        .catch(console.error);
}
(
  function () {
  let URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&daily=uv_index_max&current_weather=true&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      
      loadcard(data)
      loadInocar();
      plot(data);
      plot2(data);
      load(data);
      
    })
    .catch(console.error);
})();
