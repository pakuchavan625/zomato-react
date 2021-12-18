import React, { Component } from "react";
import Modal from 'react-modal';
import "../styles/header.css";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
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


  

export class Header extends Component {
 constructor(){
     super();
     this.state={
     loginModel : false,
     isLoggedIn:false,
     loggedInUser:undefined,
     credentailLogIn:false,
     userName:undefined,
     userEmail:undefined,
     registerForm:false,
     firstName:undefined,
     lastName:undefined,
     password:undefined,
     user:[],
     loginEmail:undefined,
     loginPassword:undefined,
     userCredential:[]
     
     

     }
 }

 responseGoogle = (response) => {
    this.setState({isLoggedIn:true,loggedInUser:response.profileObj.name,loginModel:false});
    
  }
   responseFacebook = (response) => {
    console.log(response);
    // this.setState({isLoggedIn:true, loggedInUser:response.profileObj.name,loginModel:false});
  }

  handleLogin=()=>{
      this.setState({loginModel : true })
  }

  handleLogOut =()=>{
    this.setState({ isLoggedIn: false, loggedInUser:undefined})
    window.alert("user logged out successfully")
  }
  handleModalClose=()=>{
    this.setState({loginModel : false ,credentailLogIn : false,registerForm : false})
  }
  handleRegister=()=>{
    this.setState({registerForm : true })
  }
  handleFormChangeData=(event,state)=>{
    this.setState({[state]:event.target.value})
}
handleCredentialLogin=()=>{
  
  this.setState({ credentailLogIn : true})
}

handleLoginWithCredentials=()=>{
    const { loginEmail , loginPassword }=this.state;
   
    const loginObj={
      email:loginEmail,
      password:loginPassword
    }
    axios({
      url:"http://localhost:6632/login",
      method:"POST",
      headers:{"Content-Type":"application/json" },
      data:loginObj


   }).then(res=>{
    this.setState({ userCredential:res.data.user,loggedInUser:res.data.user.firstname, credentailLogIn: false,loginModel : false,
      isLoggedIn:true })
      console.log(res.data.user)
      window.alert("user logged in successfully")

   }).catch(err=>console.log(err))

    
  }
  

handleRegistrationData=(event,state)=>{
    this.setState({[state]:event.target.value})
}
handleRegistration=()=>{
    const { userEmail,password,firstName,lastName}=this.state;
  
        const registrationObj = {
            password:password,
            email: userEmail,
            firstname:firstName,
            lastname:lastName
        };
        axios({
            url:"http://localhost:6632/signup",
            method:"POST",
            headers:{"Content-Type":"application/json" },
            data:registrationObj
      
         }).then(res=>{
          this.setState({ user : res.data.user, loggedInUser:res.data.user.firstname, registerForm:false,isLoggedIn:true})
          window.alert("Your Account Successfully Created")
          console.log(res.data.user.firstname)
         }).catch(err=>console.log(err))
        }
      
    


  render() {
    const { loginModel,isLoggedIn,loggedInUser,credentailLogIn,registerForm} =this.state;

    return (
        <div>
      <div className="header">
        <div className="header-logo">
          <b>e!</b>
        </div>
        {!isLoggedIn ?  <div className="user-group">
          <div className="UserLogin" onClick={this.handleLogin} >Login</div>
          <div className="userSignUp" onClick={this.handleRegister}>Creat an account</div>
        </div>:<div className="user-group">
          <div className="UserLogin">{loggedInUser}</div>
          <div className="userSignUp" onClick={this.handleLogOut}>Logout</div>
        </div>}
      </div>
      <Modal
                    isOpen={loginModel}
                    style={customStyles}
                 
                >
                    <div>
                    <div className="fas fa-times  remove-icon mx-2" onClick={this.handleModalClose}></div>
                    <GoogleLogin
                        clientId="616727070408-m4cp225ommgt18615knqf88h5gn4k4gj.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google_login"
                    />
                    <div className="or">
                        <span >or</span>
                    </div>
                    <FacebookLogin
                    appId="647161316463564"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} 
                   
                    className="facebook"
                    />
                    <div className="or">
                        <span >or</span>
                    </div>
                    <div>
                        <button className="btn btn-light my-2" 
                        style={{ width : "250px"}} onClick={this.handleCredentialLogin}>Continue with credential</button>
                    </div>
                    </div>
                   
               </Modal>
               <Modal
                    isOpen={credentailLogIn}
                    style={customStyles}
                 
                >
                  
                    <div>
                    <div className="fas fa-times  remove-icon mx-2" onClick={this.handleModalClose}></div>
               
                    <h4>Login to continue!</h4>
                    <div>
                               <label >Email :</label>
                               <input className="form-control" type="text" placeholder="Enter your Email "  
                               style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"loginEmail")}/>
                     </div>
                    
                    <div>
                               <label >password :</label>
                               <input className="form-control" type="password" placeholder="Enter your password"  
                               style={{width:"400px"}} onChange={(event)=>this.handleFormChangeData(event,"loginPassword")}/>
                           </div>
                          
                           
                           <button className="btn btn-success my-2 " style={{float:"right"}} onClick={this.handleLoginWithCredentials} >Login</button>
                   </div>
               </Modal>
               <Modal
                    isOpen={registerForm}
                    style={customStyles}
                 
                >
                    <div>
                    <div className="fas fa-times  remove-icon mx-2" onClick={this.handleModalClose}></div>
                   
                            <h4>Complet your Registartion</h4>
                           <div>
                               <label >Firstanme :</label>
                               <input className="form-control" type="text" placeholder="Enter your Name"  
                               style={{width:"400px"}} onChange={(event)=>this.handleRegistrationData(event,"firstName")}/>
                           </div>
                           <div>
                               <label >Lastname :</label>
                               <input className="form-control" type="text" placeholder="Enter your Email "  
                               style={{width:"400px"}} onChange={(event)=>this.handleRegistrationData(event,"lastName")}/>
                           </div>
                           <div>
                               <label >Email :</label>
                               <input className="form-control" type="text" placeholder="Enter your Email "  
                               style={{width:"400px"}} onChange={(event)=>this.handleRegistrationData(event,"userEmail")}/>
                           </div>
                           <div>
                               <label >Password :</label>
                               <input className="form-control" type="password" placeholder="Enter your Email "  
                               style={{width:"400px"}} onChange={(event)=>this.handleRegistrationData(event,"password")}/>
                           </div>
                           
                           <button className="btn btn-success my-2 " style={{float:"right"}} 
                           onClick={this.handleRegistration} 
                           >Register</button>
                   </div>
               </Modal>
      </div>
    );
  }
}

export default Header;

