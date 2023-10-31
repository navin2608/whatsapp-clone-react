import { SelectActionTypes } from "@mui/base";
import React from "react";
import { auth,provider } from "./firebaseconfig";
import "./Login.css";
import {useStateValue} from "./StateProvider.js";
function Login(){
    const[{},dispatch]=useStateValue();
    const signin=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({type:SelectActionTypes.SET_USER,
            user:result.user});
        })
        .catch((error)=>alert(error.message));        
    }
    return (
        <div className="login">
            <div className="login__container">
              <img src="https://download.logo.wine/logo/WhatsApp/WhatsApp-Logo.wine.png" alt="whatsapp log.png"/> 
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1> 
                </div>
                <button type="submit" onClick={signin}>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}
export default Login;