import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory,Link } from 'react-router-dom';

export default function Header(){
  const[change,setChange]=useState();

  let history = useHistory();
  const [emailid,setEmail]=useState();
  const [passwordid,setPassword]=useState();
  const [nameid,setName]=useState();
  var [profilepicid,setProfilePic]=useState();
  var flag=true;
  function registerButton()
  {
    fetch('http://localhost:3002/users')
      .then((res) =>{
        if (res.ok) 
        {
          return res.json();
        }
      })
      .then((data) => {
        for(var i=0;i<data.length;i++)
        {
          if(emailid===data[i].emailid)
          {
            //console.log("Tm pehle se ho bhai...");
            alert("You are already registered. Try Login...")
            flag=false;
            break;
          }
        }
      });
      setTimeout(function(){
        if(flag===true)
        {
          //console.log("Register ho gya");
          alert("Registered Successfully. Try Login....")
          const newUser={
            emailid,
            passwordid,
            nameid,
            profilepicid
          };
          fetch('http://localhost:3002/users',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            console.log('Response', data);
            history.push('/');
          });
        }
      }, 1000);
      
  }
  var flaglogin=true;
  function loginButton()
  {
    fetch('http://localhost:3002/users')
      .then((res) =>{
        if (res.ok) 
        {
          return res.json();
        }
      })
      .then((data) => {
        for(var i=0;i<data.length;i++)
        {
          if(emailid===data[i].emailid && passwordid===data[i].passwordid)
          {
            localStorage.setItem("loggedUser", emailid);
            localStorage.setItem("name",data[i].nameid);
            localStorage.setItem("photo",data[i].profilepicid);
            //console.log(localStorage.getItem("loggedUser"));
            //console.log("Mubarak ho aap prevesh kr chuke hai...");
            flaglogin=false;
            setChange(true);
            break;
          }
        }
        history.push('/');
      });
      setTimeout(function(){
        if(flaglogin)
        {
          alert("Username or Password is not valid. Try Again......")
          //console.log("kripya sahi jaankari uplabdh kraye....")
        }
      }, 500);
  }

  return(
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark text-light" style={{backgroundColor:'blue'}}>
      <a className="navbar-brand" href="/">
        <b style={{border:"2px solid white",padding:'5px',borderRadius:'8px'}}>WeAPP</b>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          {
            localStorage.getItem("loggedUser")?(
              <li className="nav-item">
                <Link className="nav-link text-white" to="fav">
                  Favourite
                </Link>
              </li>
            ):(<div>
              </div>)
          }

          {
            localStorage.getItem("loggedUser")?(<div></div>):
            (
            <li className="nav-item">          
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Register">
                Register
              </button>
                <div className="modal fade" style={{color:'black'}} id="Register" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 style={{textAlign:'center'}} className="modal-title" id="registerModalLabel">Register</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <form>
                          <label htmlFor="inputName">Enter your Name</label>
                          <input type="name" className="form-control" id="inputName"
                          aria-describedby="nameHelp" 
                          placeholder="Enter your good name"
                          onChange={(e)=>{setName(e.target.value)}}/>
                          <br></br>

                          <label htmlFor="inputRegisterEmail">Email address</label>
                          <input type="email" className="form-control" id="inputRegisterEmail"
                          aria-describedby="emailHelp" placeholder="Enter email"
                          onChange={(e)=>{setEmail(e.target.value)}} ></input>
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else...</small>
                          <br></br>
                      
                          <label htmlFor="inputRegisterPassword">Password</label>
                          <input type="password" className="form-control" id="inputRegisterPassword" 
                          placeholder="Password" 
                          onChange={(e)=>{setPassword(e.target.value);}}/>
                          <br></br>

                          <label className="form-label" htmlFor="customProfileFile">Profile Picture</label>
                          <input type="file" className="form-control" id="customProfileFile"
                          onChange={(e)=>{
                            const reader=new FileReader();
                            reader.addEventListener("load",()=>{
                              setProfilePic(reader.result);
                            })
                            reader.readAsDataURL(e.target.files[0]);
                            }} />
                          <br></br>
                          </form>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                              registerButton();}}>Register</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              )}
            
            {
            localStorage.getItem("loggedUser")?(<div></div>):
            (
            <li className="nav-item">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Login" style={{marginLeft:'10px'}}>
              Login
            </button>
              <div className="modal fade" style={{color:'black'}} id="Login" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="loginModalLabel">Login</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">

                        <label htmlFor="inputLoginEmail">Email address</label>
                        <input type="email" className="form-control" id="inputLoginEmail"
                        aria-describedby="emailHelp" placeholder="Enter email"
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                        <br></br>
                          
                        <label htmlFor="inputLoginPassword">Password</label>
                        <input type="password" className="form-control" id="inputLoginPassword"
                        placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <br></br>

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => {
                            loginButton();}}>Login</button>
                    </div>
                  </div>
                </div>
              </div>
              </li>)}
              <li className="nav-item">
              {  
              localStorage.getItem("loggedUser")?(
                <button type="button" id="logoutbutton" className="btn btn-primary" onClick={() => {
                  localStorage.clear()
                  history.push('/');
                  console.log(localStorage.getItem("loggedUser"));
                  setChange(false);
                  }} >
                  LogOut
                </button>
              ):
              (
                <div></div>
              )}
              </li>
            </ul>
            {
              localStorage.getItem("loggedUser")?(
              <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ProfileModal">
                  Profile
                </button>
                <div style={{color:'black'}}>  
                  <div class="modal fade" id="ProfileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header" style={{textAlign:'center'}}>
                          <h3>Profile</h3>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body" style={{textAlign:'center'}}>
                          <img src={localStorage.getItem("photo")} alt="Avatar" style={{width:'200px',height:'200px',borderRadius:'50%'}}/>
                          <h5 style={{paddingTop:'20px',textAlign:'left'}}>Name: {localStorage.getItem("name")}</h5>
                          <h5 style={{textAlign:'left'}}>Email: {localStorage.getItem("loggedUser")}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ):
              (
                <></>
              )}     
        </div>
      </nav>
    </header>
  );
}