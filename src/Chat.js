import db from "./firebaseconfig.js";
import React, {useState,useEffect} from "react"
import { Avatar, IconButton } from '@mui/material';
import {SearchOutlined,AttachFile,MoreVert} from '@mui/icons-material';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import {useParams} from "react-router-dom";
import "./Chat.css";

function Chat(){
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const {roomId}=useParams();
    const [roomName,setroomName]=useState(""); 
    useEffect(()=>{
        if(roomId){
            const unsubscribe= db.collection("rooms")
            .doc(roomId.split(':')[1])
            .onSnapshot((snapshot)=>setroomName
                (snapshot.data().name))   
                return ()=>{unsubscribe();}         
        }
    },[roomId]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you typed", input)
        setInput("");
    }
    return(<div className="chat">
            <div className="chat_header">
                 <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg`}></Avatar>
           <div className="chat__headerInfo">
               <h3>{roomName}</h3>
               <p>Last seen @ 12p.m</p>
           </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat__body">
                <p className={`chat__message ${true && "chat__receiver"}`}>
                <span className="chat__name">Navin Kumar </span>Hey guyz
                <span className="chat__timestamp">3.52pm</span>
                 </p>
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonOutlinedIcon />
                <form>
                <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message"></input>
                <button onClick={sendMessage} type="submit">Send message</button>
                </form>
                <MicOutlinedIcon  />
            </div>
    </div>)
}
export default Chat;