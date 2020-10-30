import React, { useState } from 'react';
import { Link, useHistory} from "react-router-dom";
import './Login.css';
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');

    const signIn = e => {
        e.preventDefault();  
        //some fancy firebase login
        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth => {
            history.push('/')
        }).catch(error => alert(error.message))

    }
    const register = e => {
        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            console.log(auth);
            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">
           
            <Link to="/">
                <img className="login__logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSOUE8B0uxf5ZOfNYxdtOFUz83J6L9sLQ58XQ&usqp=CAU" 
                alt=""
                />
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text"  value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>password</h5>
                    <input type="password"  value={password} onChange={e => setPassword(e.target.value)}/>
                    

                    <button type="submit" onClick={signIn} className="login__signinbutton">Sign in</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of use sale.pleade see our privacy notice and our intrest-based ads notice.
                </p>
                <button onClick={register}
                className="login__registerbutton">Create your Amazon Account  </button>
           </div>  
        </div>      
            
    )
};

export default Login;
