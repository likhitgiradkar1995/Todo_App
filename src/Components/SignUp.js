import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function SignUp(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [gender, setgender] = useState('');
    const [dob, setdob] = useState('');
    const [isActive, setisActive] = useState(false);
    const [errorMsg, seterrorMsg] = useState('')
    //const [signupbtnClick, setsignupbtnClick] = useState(false)

    useEffect(() => {
    console.log(props.location.state);
    }, [])

    const redirectToLogIn=()=>{
    props.history.push('/')
    }
    const signUpClick = (e) => {
        let isValidForm=checkValidation();
        if (isValidForm) {
            e.preventDefault();
            Axios.post(`http://localhost:1337/user/register`, { email, firstName, lastName, gender, dob,isActive, password })
                .then(res => {
                    console.log("inside try ")
                    console.log(res)
                    redirectToLogIn();
                }).catch(err => {
                    console.log("inside catch")
                    console.log(errorMsg)
                })
        }else{
            alert(errorMsg);
        }
    }


    function checkValidation() {
        if (!firstName.match(/^[a-zA-Z]+$/) && firstName == "") {
            seterrorMsg("first name should contain only alphabets");
            return false;
        } else if (!lastName.match(/^[a-zA-Z]+$/) && lastName == "") {
            seterrorMsg("first name should contain only alphabets");
            return false;
        } else if (gender == "") {
            seterrorMsg("gender field should not be empty");
            return false;
        }
        else if (dob == "") {
            seterrorMsg("Dob field should not be empty");
            return false;
        }
        else if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && email == "") {
            seterrorMsg("invalid email address");
            return false;
        }
        else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/) && password == "") {
            seterrorMsg("password should contain alphabet,number and special character");
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <div>
            <div>
                Email:<input type='text' value={email} onChange={e => { setemail(e.target.value) }} />
            </div>

            <div>
                FirstName:<input type='text' value={firstName} onChange={e => { setfirstName(e.target.value) }} />
            </div>

            <div>
                LastName:<input type='text' value={lastName} onChange={e => { setlastName(e.target.value) }} />
            </div>

            <div>
                Gender:<input type='text' value={gender} onChange={e => { setgender(e.target.value) }} />
            </div>

            <div>
                DOB:<input type='text' value={dob} onChange={e => { setdob(e.target.value) }} />
            </div>

            <div>
                Password:<input type='text' value={password} onChange={e => { setpassword(e.target.value) }} />
            </div>

            <div>
                <button onClick={signUpClick}> sign Up</button>
            </div>
        </div>
    )
}

export default SignUp
