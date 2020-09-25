import React, { Component } from 'react'
import axios from 'axios';

export class Weather extends Component {
    state = {
        weatherData: [],
        defaultCity: "Vancouver",
        city: ""
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log(e.target.value);
    };

    onClick = async () => {
        const instance = axios.create({
            baseURL: `https://community-open-weather-map.p.rapidapi.com/weather?q=${this.state.city}&units=metric`,
            headers: { 'x-rapidapi-key': `${process.env.REACT_APP_apiKey}` }
        });

        const data = await instance.get();

        this.setState({
            weatherData: data
        });
    }

    componentDidMount = async () => {
        const instance = axios.create({
            baseURL: `https://community-open-weather-map.p.rapidapi.com/weather?q=${this.state.defaultCity}&units=metric`,
            headers: { 'x-rapidapi-key': `${process.env.REACT_APP_apiKey}` }
        });

        const data = await instance.get();

        this.setState({
            weatherData: data
        });
    }
    render() {
        // console.log(this.state.weatherData);
        return (
            <div className="text-center">
                <h1 className="text-center bg-dark text-light p-2 rounded sticky-top col-12 mt-0 mb-2"><span role="img" aria-label="sun emoji">&#127774;</span> Weather App <span role="img" aria-label="hurricane emoji">&#127744;</span> </h1>
                <div className="mb-4">
                    <input className="p-2 mt-5" type="text" name="city" onChange={this.onChange} placeholder="Enter city name" />
                    <button className="btn btn-primary p-2 ml-1" onClick={() => this.onClick()}>Search</button>
                </div>

                {this.state.weatherData.data && this.state.weatherData.data.name ?
                    <>
                        <p><span className="font-weight-bold">City: </span> {this.state.weatherData.data.name}</p>
                        <p><span className="font-weight-bold">Temperature: </span> {this.state.weatherData.data.main.temp} ºC</p>
                        <p><span className="font-weight-bold">Feels like: </span> {this.state.weatherData.data.main.feels_like} ºC</p>
                        <p><span className="font-weight-bold">Max. Temp: </span> {this.state.weatherData.data.main.temp_max} ºC</p>
                        <p><span className="font-weight-bold">Min. Temp: </span>{this.state.weatherData.data.main.temp_min} ºC</p>
                    </>
                    : "Nothing"
                }
            </div>
        )
    }
}

export default Weather
