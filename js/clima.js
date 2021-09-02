function getClima() {

    $.ajax({
        method: 'get',
        crossDomain: true,
        url: 'https://api.openweathermap.org/data/2.5/weather?id=3468879&appid=55af94a4bea84ff650c3e5e8fd344a47&lang=pt_br',
        dataType: 'json',

        success: function (data) {
            plotarResultados(data);
            localStorage.clima = JSON.stringify(data);
            localStorage.alteracaoCache = new Date().getTime();
        },

        error: function (argument) {
            alert('Falha ao obter dados!');
        }
        
    });
}

function plotarResultados(data){
    console.log(data.weather[0].description);

            let converterCelsius = (data.main.temp - 273.15);
            celsius = (Math.round(converterCelsius) + "C°");
            $('#temperatura').html(celsius);
            $('#condicao').html(data.weather[0].description);
            $('#vento').html(data.wind.speed + "m/s");
            $('#umidade').html(data.main.humidity + "%");

            let icone = 'icons/' + data.weather[0].icon  + '.png';
            $('#i_condicao').attr('src',icone);
            $('#nascer').html(data.sys.sunrise);
            $('#por').html(data.sys.sunset);
}

function getDadosClima(){

    let tempoAtual = new Date().getTime();
    let tempoCache = parseInt(localStorage.alteracaoCache);
    let diferencaTempos = tempoAtual - tempoCache;

    if (diferencaTempos > 300000){
        getClima();
    } else {
        let data = JSON.parse(localStorage.clima);
        plotarResultados(data);
    }

}

window.onload = function () {
    getDadosClima();
};