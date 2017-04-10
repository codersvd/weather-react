import "./less/style.less";

import React from "react";
import {render} from "react-dom";

import { Cities } from "./components/cities.jsx";

class App extends React.Component {
    render(){
        return(
            <div className="wrapper">
                <Cities/>
            </div>
        );
    }

}

render(<App/>,document.getElementById('root'));