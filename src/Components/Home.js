import React from 'react';
import '../styles/home.css';

import WallPaper from './WallPaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';


class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      Locations :[],
      mealTypes:[]
    }
  }
 componentDidMount(){
   sessionStorage.clear();
   axios({
      url:"https://zomato-clonebc.herokuapp.com/location",
      method:"GET",
      headers:{"Content-Type":"application/json" }
   }).then(res=>{
    this.setState({ Locations : res.data.location})
   }).catch(err=>console.log(err))
   axios({
      url:"https://zomato-clonebc.herokuapp.com/MealTypes",
      method:"GET",
      headers:{"Content-Type":"application/json" }
   }).then(res=>{
    this.setState({ mealTypes : res.data.Mealtypes})
   }).catch(err=>console.log(err))
 }
    render(){
     const {Locations,mealTypes}=this.state
       return (
           <div>
        <WallPaper locationData={Locations}/>       
        <QuickSearch mealTypesData={mealTypes}/>        

         </div>
       )
    }
};


export default Home ;



