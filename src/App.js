import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      country_data: '',
      country_code: 'GB'
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  async componentDidMount(){
    const response = await fetch(`https://www.trackcorona.live/api/countries/${this.state.country_code}`);
    const json = await response.json();
    this.setState({country_data: json.data[0]});
  }

  async changeHandler(event){

    await this.setState({country_code: event.target.value});

    this.componentDidMount()
  }

  render () {
    return (
      <div>
        <div>
          <form>
          <select onChange={this.changeHandler}>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="IT">Italy</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
          </form>
        </div>
        <div className="info">
          <h2>Country: {this.state.country_data.location}</h2>
          <p>Confirmed cases: {this.state.country_data.confirmed}</p>
          <p className="alive">recovered: {this.state.country_data.recovered}</p>
          <p className="dead">Dead: {this.state.country_data.dead}</p>
        </div>
        <div className="footer">         
          <p>Built using <a href='https://www.trackcorona.live/'>Trackcorona</a></p>
        </div>
      </div>
    );
  }
  
}

export default App;
