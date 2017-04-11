import fetch  from "isomorphic-fetch";

class Api {
    constructor(props) {
        this.key = "d4541f6d5b47f6f43df1fdc79e225396";
        this.link = "http://api.openweathermap.org/data/2.5/weather";
        this.iconLink = "http://openweathermap.org/img/w/";
    }

    getData(cityName) {
        let mainLink = this.link + "?q=" + cityName + "&appid=" + this.key;

        return fetch(mainLink)
            .then(res => {
                if (res.status >= 400)
                    throw new Error("Server error");
                return res.text();
            })
            .then(res=>{
                return this._structureData(res);
            });
    }

    _getIcon(iconName){
        return iconName ? this.iconLink+iconName+".png" : null;
    }

    _structureData(data){
        let infoToJson = JSON.parse(data);
        return {
                weather: infoToJson.weather || null,
                mainInfo: infoToJson.main || null,
                system: infoToJson.sys || null,
                city: infoToJson.name || null,
                wind: infoToJson.wind || null,
                icon: this._getIcon(infoToJson.weather[0].icon)
            }
    }

}

module.exports = Api;