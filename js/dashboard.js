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
    let URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=uv_index_max&timezone=auto";
        
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
(
  function () {
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.20&longitude=-79.89&hourly=temperature_2m&daily=uv_index_max&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // let timezone = data[timezone];
      // let tzhtml = document.getElementById("zonetime");
      // tzhtml.innerHTML =timezone
      plot(data)
      plot2(data)
      load(data)
    })
    .catch(console.error);
})();
