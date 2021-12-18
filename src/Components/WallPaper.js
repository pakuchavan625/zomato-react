import React from "react";
import '../styles/home.css';
import axios from "axios";
import {withRouter} from 'react-router-dom'


class WallPaper extends React.Component{

    constructor(){
        super();
        this.state={
            restaurants : [],
            inputText :undefined,
            suggestion:[]
        }
    }

    handleLocationChange=(event)=>{
        const loactionID=event.target.value;
        sessionStorage.setItem("locationId",loactionID)


        axios({
            url:`http://localhost:6632/restaurants/${loactionID}`,
            method:"GET",
            headers:{"Content-Type":"application/json" }
         }).then(res=>{
          this.setState({ restaurants : res.data.restaurants})
         }).catch(err=>console.log(err))

    }

    handleInputSearch =(event)=>{
        const {restaurants } =this.state;

        const inputText = event.target.value;

        let suggestion = [];

        suggestion = restaurants.filter(item=> item.name.toLowerCase().includes((inputText.toLowerCase())));

        this.setState({ inputText , suggestion })
    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restauarnt=${resObj._id}`);
    }

    showSuggestion =()=>{
        const { suggestion,inputText} =this.state;
        if(suggestion.length == 0 && inputText == undefined ){
            return null;
        }
        if(suggestion.length > 0 && inputText =='' ){
            return null;
        }
        if(suggestion.length == 0 && inputText  ){
            return <ul className="searchdata" >
                <li className="listSearch">No Search Result Found</li>
            </ul>
        }
        return(
            <ul className="searchdata">
               {
                suggestion.map((item, index) => (<li className="listSearch" key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
               }
            </ul>
        )
    }
 
    render(){
        
      const {locationData}=this.props;
        return(
            <div>
                 {/* imge entere here */}
        <img src="Assets/homepageimg.png" alt="" style={{width: "100%",height:"498px" }} />
        {/* image over here*/} 

      {/*button on top right of image  start here*/}
        {/*<div classNameName="buttons">*/}
            {/* <button type="button" className="btn btn-outline-secondary text-white login-button">Login</button>
            <button type="button" className="btn btn-outline-secondary  text-white SignUp-button">Creat an account</button> */}
        {/* </div>   */}
        <div className="position">
            <div className="homelogo"  >
                <b>e!</b>
            </div>
            <div className="headings">find the best resturants,cafes and bar</div>
                <span >
                <select className="selectDropdown" onChange={this.handleLocationChange}>
                    <option value="0"> select a city</option>
                  {locationData.map((item)=>{
                      return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                  })}
                   
                </select>
             
                
             
                <span  className="fas fa-search  search-icon " ></span>
                
               
                <input  className="search-input" type="text" 
                placeholder="Search for resturants" onChange={this.handleInputSearch}/> <br/>
                {this.showSuggestion()}
               
          
            </span>
           
            
           
        </div>

        </div>
        )
    }
}


export default withRouter(WallPaper);
