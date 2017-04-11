import React from "react";
import {InfoView} from "./infoWeather.jsx";
import Api from "./../lib/api";

export class Cities extends React.Component {
    constructor(props) {
        super();
        this.state = {
            cities: [
                "London",
                "Moscow",
                "Berlin",
                "Voronezh"
            ],
            componentInfo: null
        };
        this.handlerChangeCity = this.handlerChangeCity.bind(this);
    }

    getWeather(city) {
        let api = new Api();
        api.getData(city || this.state.currentCity).then(res => {
            this.setState({componentInfo: res});
        });
    }

    componentDidMount(){
        this.getWeather(this.state.cities[0]);
        setInterval(()=>this.getWeather(this.state.componentInfo.city || this.state.cities[0]), 30000);
    }

    handlerChangeCity(event) {
        this.getWeather(event.target.value);
    }

    render() {
        return (
            <div className="blockWeather">
                <form id="select_city">
                    <label htmlFor="">Select City: </label>
                    <div className="selectWrap">
                        <select onChange={this.handlerChangeCity}>
                            {this.state.cities.map((current, index) => {
                                return <option value={current} key={index}>{current}</option>
                            })}
                        </select>
                    </div>
                </form>
                {this.state.componentInfo ? <InfoView allInfo={this.state.componentInfo}/> : ""}
            </div>
        )
    }
}