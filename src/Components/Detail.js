import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import '../styles/details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';




const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "antiquewhite",
      border: "1px solid brown",
      
     
    },
  };

export class Detail extends Component {
    constructor(){
        super();
        this.state={
            restauarnt :{},
            resId:undefined,
            gallaryModal:false,
            menuItemModel:false,
            formModel:false,
            menuitems:[],
            subTotal : 0,
            userName:undefined,
            userEmail:undefined,
            userContact:undefined,
            userAddress:undefined
        }
    }
   
    componentDidMount(){
        const qs=queryString.parse(this.props.location.search);
        const {restauarnt}=qs
        axios({
            url:`https://zomato-clonebc.herokuapp.com/restaurant/${restauarnt}`,
            method:"GET",
            headers:{"Content-Type":"application/json" }
         }).then(res=>{
          this.setState({ restauarnt : res.data.restaurants , resId:restauarnt})
         }).catch(err=>console.log(err))

    }

    
    handleModal=(state,value)=>{
        const{resId}=this.state
        if(state ==="menuItemModel" && value=== true){
            axios({
                url:`https://zomato-clonebc.herokuapp.com/menuitems/${resId}`,
                method:"GET",
                headers:{"Content-Type":"application/json" }
             }).then(res=>{
              this.setState({ menuitems : res.data.menuitemslist })
             }).catch(err=>console.log(err))
    
        }

        this.setState({[state]:value})
    }

    addItems = (index, operationType) => {
        let total=0;
        const items =[...this.state.menuitems];
        const item =items[index];
        
        if (operationType === 'add'){
            item.qty += 1 ;
        }
        else{
            item.qty -= 1 ;
        }

        items[index]=item;
        items.map((item)=>{
           return  total += item.qty *item.price

        })
        this.setState({menuitems :items, subTotal:total})
        }
    
        handleFormChangeData=(event,state)=>{
            this.setState({[state]:event.target.value})
        };

        isDate(val) {
            // Cross realm comptatible
            return Object.prototype.toString.call(val) === '[object Date]'
        }
    
        isObj = (val) => {
            return typeof val === 'object'
        }
    
        stringifyValue = (val) => {
            if (this.isObj(val) && !this.isDate(val)) {
                return JSON.stringify(val)
            } else {
                return val
            }
        }
    
        buildForm = ({ action, params }) => {
            const form = document.createElement('form')
            form.setAttribute('method', 'post')
            form.setAttribute('action', action)
    
            Object.keys(params).forEach(key =>{
                const input = document.createElement('input')
                input.setAttribute('type', 'hidden')
                input.setAttribute('name', key)
                input.setAttribute('value', this.stringifyValue(params[key]))
                form.appendChild(input)
            })
            return form
        }
    
        post = (details) => {
            const form = this.buildForm(details)
            document.body.appendChild(form)
            form.submit()
            form.remove()
        };
    
        getData = (data) => {
            return fetch("https://zomato-clonebc.herokuapp.com/payment", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then(response => response.json()).catch(err => console.log(err))
        }

        handlePayment=()=>{
            const { subTotal , userEmail}=this.state;
            if ( userEmail ) {
                alert('Please fill this field and then Proceed...');
            }
            else {
                // Payment API Call 
                const paymentObj = {
                    amount: subTotal,
                    email: userEmail
                };
    
                this.getData(paymentObj).then(response => {
                    var information = {
                        action: "https://securegw-stage.paytm.in/order/process",
                        params: response
                    }
                    this.post(information)
                })
            }

          
        }



    render() {
        const {restauarnt,gallaryModal,menuItemModel,menuitems,subTotal,formModel}=this.state
        return (
            <div>
            <div>
                <img src={`${restauarnt.image}`} alt="" width="100%" height="350" />
                <button className="photo-button" onClick={()=>this.handleModal('gallaryModal',true)} >Click to see Image Gallery</button>
            </div>
            <div className="heading">{restauarnt.name}</div>
            <button className="btn-order"  onClick={()=>this.handleModal('menuItemModel',true)}>Place Online Order</button>

            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="tab-1" name="tab-group-1" checked />
                    <label for="tab-1"  >Overview</label>

                    <div className="content">
                        <div className="about">About this place</div>
                        <div className="head">Cuisine</div>
                        <div className="value">{restauarnt && restauarnt.cuisine && restauarnt.cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                        <div className="head">Average Cost</div>
                        <div className="value">&#8377; {restauarnt.min_price} for two people(approx)</div>
                    </div>
                </div>

                <div className="tab">
                    <input type="radio" id="tab-2" name="tab-group-1" />
                    <label for="tab-2">Contact</label>
                    <div className="content">
                        <div className="head">Phone Number</div>
                        <div className="value">{restauarnt.contact_number}</div>
                        <div className="head">{restauarnt.name}</div>
                        <div className="value">{`${restauarnt.locality}, ${restauarnt.city}`}</div>
                    </div>
                </div>
            </div>
            <Modal
                    isOpen={gallaryModal}
                    style={customStyles}
                 
                >
                    <div>
                        <div className="fas fa-times  remove-icon" onClick={()=>this.handleModal('gallaryModal',false)}></div>
                        <Carousel  showThumbs={false}>
                      
                            {restauarnt &&  restauarnt.thumb && restauarnt.thumb.map((item)=>{
                                return <div>
                                <img src={`${item}`} alt=""  className="gallaryImages"/>
                                </div>
                                
                            })}
                                
                                
                     </Carousel>
                    </div>
                   
               </Modal>
            <Modal
                    isOpen={menuItemModel}
                    style={customStyles}
                     
                >
                   <div >
                        <div className="fas fa-times  remove-icon" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('menuItemModel', false)}></div>
                        <div  className="menuitem-container">
                            <h3 className="restaurant-name px-2">{restauarnt.name}</h3>
                            <h3 className="item-total">SubTotal : {subTotal}</h3>
                            <button className="btn btn-danger order-button"
                             onClick={() =>{
                                this.handleModal('menuItemModel', false);
                                this.handleModal('formModel', true)
                             } }
                            
                        > Pay Now</button>
                            { menuitems && menuitems.map((item, index) => {
                                return <div className="MenuItemContainer" >
                                    <div className="card" >
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " >
                                                <span className="card-body" >
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-9 col-md-3 col-lg-3">
                                                <div className="left-body">
                                                <img className="menu-img" src={`${item.image}`  } style={{
                                                    height: '75px',
                                                    width: '75px',
                                                    borderRadius: '20px',
                                                    marginTop: '12px',
                                                    marginLeft: '3px'
                                                }} alt="" />
                                                {item.qty === 0 ? <div>
                                                    <button className="add-button" 
                                                    onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'subtract')}>-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')}>+</button>
                                                    </div>}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                           
                        </div>
                    </div>
               </Modal>
               <Modal
                    isOpen={formModel}
                    style={customStyles}
                 
                >
                    <div>
                        <div className="fas fa-times  remove-icon" onClick={()=>this.handleModal('formModel',false)}></div>
                           <div>
                               <label >Name :</label>
                               <input className="form-control" type="text" placeholder="Enter your Name"  
                               style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"userName")}/>
                           </div>
                           <div>
                               <label >Email :</label>
                               <input className="form-control" type="text" placeholder="Enter your Email "  
                               style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"useEmail")}/>
                           </div>
                           <div>
                               <label >Phone Number :</label>
                               <input className="form-control" type="tel" placeholder="Enter your phone Number " 
                                style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"userContact")}/>
                           </div>
                           <div>
                               <label >Address:</label>
                               <input  className="form-control" type="text" placeholder="Enter your phone Address " 
                               style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"userAddress")}/>
                           </div>
                           <button className="btn btn-success my-2 " style={{float:"right"}} onClick={this.handlePayment}>Proceed</button>
                    </div>
                   
               </Modal>
        </div>
        )
    }
}

export default Detail
