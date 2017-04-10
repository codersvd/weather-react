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
            currentCity: null,
            componentInfo: null
        };
        this.handlerChangeCity = this.handlerChangeCity.bind(this);
    }

    getWeather() {
        let api = new Api();
        api.getData(this.state.currentCity).then(res => {
            this.setState({componentInfo: res});
        });
    }

    componentWillMount() {
        this.setState({currentCity: this.state.cities[0]});
    }
    componentDidMount(){
        this.getWeather();
    }

    handlerChangeCity(event) {
        this.setState({currentCity: event.target.value});
        this.getWeather();
    }

    render() {
        let infoBlock = null;
        if(this.state.componentInfo) {
            infoBlock = <InfoView allInfo={this.state.componentInfo}/>
        }
        else {
            infoBlock = "";
        }
        return (
            <div className="blockWeather">
                <form>
                    <select onChange={this.handlerChangeCity}>
                        {this.state.cities.map((current, index) => {
                            return <option value={current} key={index}>{current}</option>
                        })}
                    </select>
                </form>
                {infoBlock}
            </div>
        )
    }
}