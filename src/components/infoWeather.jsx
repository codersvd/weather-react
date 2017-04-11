import  React from "react";

export class InfoView extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            weather: props.allInfo.weather[0],
            currentWeather: props.allInfo.mainInfo,
            city: props.allInfo.city,
            wind: props.allInfo.wind,
            icon: props.allInfo.icon
        };

    }

    typeTempC(temp){
        return Math.round(temp-273.15);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            weather: nextProps.allInfo.weather[0],
            currentWeather: nextProps.allInfo.mainInfo,
            city: nextProps.allInfo.city,
            wind: nextProps.allInfo.wind,
            icon: nextProps.allInfo.icon
        });
    }

    render(){
        return(
            <div className="info">
                <h2>Weather in {this.state.city}</h2>
                <div className="icon">
                    <img src={this.state.icon} alt={this.state.weather.description}/>
                    <div className="mainWeather">{this.state.weather.description}</div>
                </div>
                <ul>
                    <li>Tem. current <span>{this.typeTempC(this.state.currentWeather.temp)} &deg;C</span></li>
                    <li>Tem. min/max
                        <span className="tempMin">{this.typeTempC(this.state.currentWeather.temp_min)} &deg;C</span>
                        <span className="tempMax">{this.typeTempC(this.state.currentWeather.temp_max)} &deg;C</span></li>
                    <li>Pressure <span>{this.state.currentWeather.pressure} hpa</span></li>
                    <li>Humidity <span>{this.state.currentWeather.humidity} %</span></li>
                    <li>Wind <span>{this.state.wind.speed} m/s</span></li>
                </ul>
            </div>
        );
    }
}