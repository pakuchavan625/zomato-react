import React from 'react';
import '../styles/filter.css'
import queryString from 'query-string'
import axios from 'axios'
import ReactPaginat from "react-paginate"



class Filter  extends React.Component{
  

  constructor(){
    super();
    this.state ={
      restaurant:[],
      Locations:[],
      cuisinArray:[],
      mealtype:undefined,
      location:undefined,
      cuisin:undefined,
      lcost:undefined,
      hcost:undefined,
      sort:1,
      page:1,
      pageCount:undefined
      
    }
  }
  componentDidMount(){
    const qs=queryString.parse(this.props.location.search);
    const {mealtype , location}=qs

    const filterObj ={
      mealtype :Number(mealtype),
      location :Number(location)

    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants, mealtype :Number(mealtype), location_id:location, pageCount:res.data.data})
   }).catch(err=>console.log(err))

   axios({
    url:"http://localhost:6632/location",
    method:"GET",
    headers:{"Content-Type":"application/json" }
 }).then(res=>{
  this.setState({ Locations : res.data.location})
 }).catch(err=>console.log(err))
   
  }
  
 

  handleOnChangeSort=(sort)=>{
    const{mealtype,location,cuisin,lcost,hcost,page}=this.state
    const filterObj ={
      mealtype,
      sort,
      location:location,
      cuisin,
      lcost,
      hcost,
      page
    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants , sort,pageCount:res.data.data})
   }).catch(err=>console.log(err))
  }

  handleOnChangeCost=(lcost,hcost)=>{
    const{mealtype,location,cuisin,sort,page}=this.state
    
    const filterObj ={
      mealtype,
      sort,
      location,
      cuisin,
      lcost,
      hcost,
      page
    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants ,lcost,hcost})
   }).catch(err=>console.log(err))

  }
  handleLocationOnChange=(event)=>{
    const location=event.target.value;
    const{mealtype,lcost,hcost,cuisin,sort,page}=this.state
    
    const filterObj ={
      mealtype,
      sort,
      location,
      cuisin,
      lcost,
      hcost,
      page
    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants, location,pageCount:res.data.data})
   }).catch(err=>console.log(err))
  }

  handleCuisin=(item)=>{
    
    const{mealtype,lcost,hcost,location,sort,page,cuisinArray}=this.state
    if(cuisinArray.indexOf(item) === -1){
      cuisinArray.push(item)
    }
    else{
      var index= cuisinArray.indexOf(item);
      cuisinArray.splice(index,1)
    }
    
    const filterObj ={
      mealtype,
      sort,
      location:location,
      cuisin:cuisinArray.length > 0 ? cuisinArray : undefined,
      lcost,
      hcost,
      page
    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants , cuisin:cuisinArray,pageCount:res.data.data})
   }).catch(err=>console.log(err))
  }



  handlePageClick=(page)=>{
    const data=page.selected +1 ;
    const{mealtype,lcost,hcost,cuisin,sort,pageCount,location}=this.state
    
    const filterObj ={
      mealtype,
      sort,
      location,
      cuisin,
      lcost,
      hcost,
      page:data,
      pageCount
    }
    axios({
      url:"http://localhost:6632/filter",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:filterObj

   }).then(res=>{
    this.setState({ restaurant : res.data.restaurants, pageCount:res.data.data})
   }).catch(err=>console.log(err))
  }
  

  
  

  handleNavigate=(resId)=>{
    this.props.history.push(`/details?restauarnt=${resId}`)
  }


    render(){
      const {restaurant ,Locations,pageCount}=this.state;
      
     
        return (
            <div>
               
      <div className="container">
          <div className="main-header">Breakfast places in mumbai</div>
          <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 ">
                <div className="filter-section">
                  <div className="filter-content">
                    <div>
                    <span className="fliter-heading">Filter/Sort</span>
                      <span  className="fas fa-chevron-down icontwo " type="button" data-bs-toggle="collapse" data-bs-target="#filter"></span>
                     
                    </div>
                   
                    <div id="filter"  className="collapse show"  >
                    <div className="filter-subheader">Select</div>
                    <select className="select-dd" onChange={this.handleLocationOnChange}>
                      <option value="0">Select</option>
                      {Locations && Locations.map((select)=>{
                        return   <option value={select.location_id}  >{`${select.name},${select.city}`}</option>
                        
                      })}
                    
                    </select>
                    <div className="filter-subheader">cuisine</div>
                    <div >
                      <input type="checkbox"  onChange={()=>this.handleCuisin(1)}/>
                      <label className="input-fileds mx-1" 
                     >Nort Indian</label>
                    </div>
                    <div>
                      <input type="checkbox" onChange={()=>this.handleCuisin(2)}/>
                      <label className="input-fileds mx-1"  
                      >South Indian</label>
                    </div>
                    <div>
                      <input type="checkbox" onChange={()=>this.handleCuisin(3)}/>
                      <label className="input-fileds mx-1"  
                      >Chiness</label>
                    </div>
                    <div>
                      <input type="checkbox" onChange={()=>this.handleCuisin(4)}/>
                      <label className="input-fileds mx-1" 
                      >Fast Food</label>
                    </div>
                    <div>
                      <input type="checkbox" onChange={()=>this.handleCuisin(5)}/>
                      <label className="input-fileds mx-1"  
                      >Street Food</label>
                    </div>
                    <div className="filter-subheader ">Cost for two</div>
                    <div>
                      <input type="radio" name="cost" onChange={()=>this.handleOnChangeCost(1,500)} />
                      <label  className="input-fileds mx-1">Less then 	&#8377; 500</label>
                    </div>
                    <div>
                      <input type="radio" name="cost" onChange={()=>this.handleOnChangeCost(500,1000)}/>
                      <label  className="input-fileds mx-1">	&#8377;500 to  &#8377; 1000</label>
                    </div>
                    <div>
                      <input type="radio" name="cost" onChange={()=>this.handleOnChangeCost(1000,1500)}/>
                      <label  className="input-fileds mx-1"> 	&#8377;1000 to &#8377; 1500</label>
                    </div>
                    <div>
                      <input type="radio" name="cost" onChange={()=>this.handleOnChangeCost(1500,2000)}/>
                      <label  className="input-fileds mx-1">&#8377; 1500 to	&#8377; 2000</label>
                    </div>
                    <div>
                      <input type="radio" name="cost" onChange={()=>this.handleOnChangeCost(2000,10000)}/>
                      <label  className="input-fileds mx-1">&#8377; 2000+</label>
                    </div>
                    <div className="filter-subheader ">Sort</div>
                    <div>
                      <input type="radio" name="sort"  onChange={()=>this.handleOnChangeSort(1)} />
                      <label  className="input-fileds mx-1">Price low to high</label>
                    </div>
                    <div>
                      <input type="radio" name="sort" onChange={()=>this.handleOnChangeSort(-1)}/>
                      <label  className="input-fileds mx-1">Price high to low</label>
                    </div>
                  </div>
                     {/* <!-- filter content end  here --> */}
                  </div>
                </div>
              </div>
              {/* <!-- right column starts here --> */}
              <div className="col-lg-8 col-md-12 col-sm-12 ">
                {restaurant.length !==0 ?restaurant.map((item)=>{
                  return  <div className="item" key={item.name} onClick={()=>this.handleNavigate(item._id)}>
                  <div className="recta-box">
                    <div className="left-item">
                      <img className="img-fluid" src={`${item.image}` } alt="" />
                    </div>
                    <div className="right-item">
                      <div className="search-header">
                        {item.name}
                      </div>
                      <div className="filter-subheader">{item.city}</div>
                      <address>{item.locality}</address>
                    </div>
                   <hr/>
                <div className="cuisin-items" >
                  <div className="leftone" style={{display:"inline-block", width: "30%"}}>
                    <div className="details-heading">Cusine :</div>
                    <div className="details-heading">Cost for two :</div>
                  </div>
                  <div className="rightone"style={{display:"inline-block"}}>
                    <div className="details-heading">{item.cuisine.map(item=>`${item.name} `)}</div>
                    <div className="details-heading">	{item.min_price}</div>
                  </div>
                </div>
                  </div>
                </div>
                }):<div className="no-element">No record Found...</div>}
                 
                   {restaurant.length !== 0 ?<div className="pagination-designe"> <ReactPaginat 
                      breakLabel="..."
                      nextLabel={"next"}
                      onPageChange={this.handlePageClick}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      previousLabel={"pre"}
                      renderOnZeroPageCount={null}
                      className="pagination-designe"
                      
                    /></div> : null} 
               
          </div>
                
          </div>
          </div>
          </div>

        )
    }
}
    

export default Filter