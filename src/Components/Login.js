import Axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router ,Link,NavLink, Route } from 'react-router-dom';
import SignUp from './SignUp';

function Login(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userId, setuserId] = useState("");

    const loginClick = () => {
        console.log(email,password);
        Axios.post(`http://localhost:1337/user/login`, { email, password })
            .then(res => {
                console.log("After login",res.data);
                const id=res.data.data.id;
                
                gotoUserTask(id);
            }).catch(err => {
                console.log(err);
            })
    }
     
    const gotoUserTask=(id)=>{
        console.log("go to usertask",id);
        props.history.push({pathname:'/userTask',state:id});
    }

    const gotoSignUp=()=>{
        props.history.push({pathname:'/SignUp',state:"likhit"});
    }

    return (
       
        <div>

            <div>
                <input type='text' placeholder='Enter your Email' value={email} onChange={e => setemail(e.target.value)} />
            </div>
            <div>
                <input type='text' placeholder='Enter your password' value={password} onChange={e => setpassword(e.target.value)} />
            </div>
            <div>
                <button  onClick={loginClick}>Login</button>
            </div>

            <a type='button' style={{color:'blue'}} onClick={gotoSignUp}>New User? SignUp</a>

            
             {/* <NavLink to='/signup'>New User? Sign Up</NavLink> */}
            
           {/* <Route path='/signup' component={SignUp}></Route> */}

           {/* <Router>
               <div>
               <div><NavLink to={{pathname:'/SignUp',state:"likhit"}}>New User? Sign Up</NavLink> </div>
               <Route path='/SignUp' exact component={SignUp}/>
               </div>
           </Router> */}
            
          
        </div>
       
    )
}

export default Login
