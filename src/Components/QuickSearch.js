
import React from "react";
import '../styles/home.css';
import {withRouter} from 'react-router-dom'
import QuickSearchItems from "./QuickSearchItems";




class QuickSearch extends React.Component{
    handleNaviagte=()=>{
        this.props.history.push('/filter')
    }

    render(){
        const {mealTypesData}=this.props
        return(
            
            <div>
             <div className="container">
              <div className="qs-header">Quick searches</div>
    <div className="qs-subheading">Discover resturant by type of meal</div>
    <div className="row">
       {mealTypesData.map((item)=>{
           return <QuickSearchItems quickSearchItemData={item}/>
       })}
       
       
       
      
    </div>
    </div>
    </div>
        )
    }
}

export default withRouter( QuickSearch);