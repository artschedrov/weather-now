const https = require ("https");
const HTMLParser = require ("node-html-parser");
const cowsay = require("cowsay");

exports.weatherNow = function() {
  let link = "https://www.gismeteo.ru/weather-novosibirsk-4690/now/"

  https.get(link, (response) => {
    let htmlResult;
    let statusWeather;
    response.on("data", (chunk) => {
        htmlResult += chunk;
    });
    response.on("end", () => {
        let regex = new RegExp(/ /d,'');
        let htmlResult1 = HTMLParser.parse(htmlResult).querySelector(".tab-weather__value > span:nth-child(1) > span:nth-child(1)");
        statusWeather = HTMLParser.parse(htmlResult).querySelector(".tip");
        statusWeather = statusWeather.text;
        htmlResult1 = htmlResult1.text;
        htmlResult1 = htmlResult1.trim();
        console.log(cowsay.say({
            text: `Сейчас в Новосибирске: ${htmlResult1} ${statusWeather}`
        }));
    });
  });
}