import React from 'react'
import '../styles/home.css';
import {withRouter} from 'react-router-dom'

class QuickSearchItems extends React.Component{
    handleNavigate = (mealtypeId) => {
        const locationId=sessionStorage.getItem("locationId");

        if (locationId){
            this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
        }
        else{
            this.props.history.push(`/filter?mealtype=${mealtypeId}`);
        }
        
    }

    render(){
        const {quickSearchItemData}=this.props
        return(
    
         <div className="col-lg-4 col-md-6 col-sm-12" onClick={()=>this.handleNavigate(quickSearchItemData.meal_type)}>
         <div className="card-item">
            <div className="left-card-item">
                <img className="img-fluid"src={`${quickSearchItemData.image}`} alt=""/>
            </div>
            <div className="right-card-item">
                <div className="card-heading">{quickSearchItemData.name}</div>
                <p className="card-para">{quickSearchItemData.content}</p>
            </div>
        </div>
    </div>
        
        )
    }
}

export default withRouter(QuickSearchItems);
