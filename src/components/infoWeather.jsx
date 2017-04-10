import  React from "react";

export class InfoView extends React.Component {
    constructor(props){
        super(props);
        console.log(props.allInfo);
        this.weather = props.allInfo.weather;
        this.currentWeather = props.allInfo.mainInfo;
        this.city = props.allInfo.city;
        this.wind = props.allInfo.wind;
        this.icon = props.allInfo.icon;
    }

    render(){
        return(
            <div className="info">
                <h2>Weather in {this.city}</h2>
                <div className="icon"><img src={this.icon} alt={this.weather.description}/></div>
                <ul>
                    <li>Tem. current <span>{this.currentWeather.temp}</span></li>
                    <li>Tem. min/max <span className="tempMin">{this.currentWeather.temp_min}</span> <span className="tempMax">{this.currentWeather.temp_max}</span></li>
                    <li>Pressure {this.currentWeather.pressure} hpa</li>
                    <li>Humidity {this.currentWeather.humidity} %</li>
                    <li>Wind {this.wind.speed} m/s</li>
                </ul>
            </div>
        );
    }
}