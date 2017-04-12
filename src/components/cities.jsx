import React from "react";
import {InfoView} from "./infoWeather.jsx";
import Api from "./../lib/api";

export class Cities extends React.Component {
    constructor(props) {
        super();
        this.state = {
            error: null,
            cities: [
                "London",
                "Moscow",
                "Berlin",
                "Voronezh"
            ],
            connect: null,
            load: "Loading...",
            componentInfo: null
        };
        this.handlerChangeCity = this.handlerChangeCity.bind(this);
    }

    getWeather(city) {
        if(window.navigator.onLine) {
            this.setState({connect: null});
            let api = new Api();
            api.getData(city || this.state.currentCity).then(res => {
                this.setState({componentInfo: res, error: null, load: null});
            }).catch(err => {
                this.setState({error: "Nothing found"});
            });
        }
        else {
            this.setState({connect: "No network connection"});
        }
    }

    componentDidMount(){
        this.getWeather(this.state.cities[0]);
        this.timer = setInterval(()=>this.getWeather(this.state.componentInfo.city || this.state.cities[0]), 30000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    handlerChangeCity(event) {
        this.getWeather(event.target.value);
    }

    render() {
        return (
            <div className="blockWeather">
                {this.state.connect ? <div className="noNetwork">{this.state.connect}</div> : ""}
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
                { this.state.error ? <div className="error">{this.state.error}</div> : (!this.state.load ? <InfoView allInfo={this.state.componentInfo}/> : this.state.load) }
            </div>
        )
    }
}