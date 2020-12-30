import React, { Component , useState, useRef } from 'react';
import axios from 'axios';
import _ from "lodash";
import './App.css';



const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;




class App extends Component {
  // delayedQuery = useRef(_.debounce(q => console.log(q), 500)).current;

  constructor(){

   
    super();

    this.state ={
      search: null,
      country : [
        'Italy','Spain','USA',
        'Kenya'
      ]
    }


    // this.onChangeDebounced = _.debounce(this.onChangeDebounced, 2000)

  }

  componentDidMount(){
    axios
    .get(ITEMS_API_URL )
    .then((response)=>{
      console.log('r',response);
    })
   
    .then(response => {
      this.setState({ country: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });

  }



  searchSpace=(e)=>{    
  
    const delayedQuery = _.debounce(q => 

     this.setState({search:q}), DEBOUNCE_DELAY);

    delayedQuery(e.target.value); 

  }
  render(){

 

    const items = this.state.country.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.toLowcerCase().includes(this.state.search.toLowerCase()) || data.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    }).map(data=>{
      return(
      <div>
        <ul>
          <li className= "list">
            <span className="styleInfo">{data}</span>            
          </li>
        </ul>
      </div>
      )
    })

    return (
      <div>
      <input type="text" placeholder="Search" className="elementStyle" onChange={(e)=>this.searchSpace(e)} />
      {items}
      </div>
    )
    
  }
}

export default App