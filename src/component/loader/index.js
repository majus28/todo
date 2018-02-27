import React, {Component} from "react";
import './loader.css'

class Loader extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className='loader'></div>
        )
    }
};
export default Loader;
