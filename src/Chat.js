import db from "./firebaseconfig.js";
import React, {useState,useEffect} from "react"
import { Avatar, IconButton } from '@mui/material';
import {SearchOutlined,AttachFile,MoreVert} from '@mui/icons-material';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import {useParams} from "react-router-dom";
import "./Chat.css";
import {useStateValue} from './StateProvider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
function Chat(){
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const {roomId}=useParams();
    const [roomName,setroomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    
   // console.log(timestamp); 
    useEffect(()=>{
        if(roomId){
            const unsubscribe= db.collection("rooms")
            .doc(roomId.split(':')[1])
            .onSnapshot((snapshot)=>setroomName
                (snapshot.data().name)); 
                // return ()=>{unsubscribe();}
                db.collection('rooms').doc(roomId.split(':')[1]).
                collection("messages").orderBy
                ('timestamp').onSnapshot(snapshot=>{
                    (setMessages(snapshot.docs.map(doc=>doc.data())))
                })
        }
    },[roomId]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])
    const sendMessage=(e)=>{
        e.preventDefault();
        let timestamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection('rooms').doc(roomId.split(':')[1]).collection('messages').add({
            name:user.displayName,
            timestamp:new Date(),
            message:input
        })
        console.log("you typed", input)
        setInput("");
    }
    return(<div className="chat">
            <div className="chat_header">
                 <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg`}></Avatar>
           <div className="chat__headerInfo">
               <h3>{roomName}</h3>
               <p>{messages.length>0?`Last seen at ${new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}`:""}</p>
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
                {messages.map((message)=>(
                <p className={`chat__message ${(message.name===user.displayName) && "chat__receiver"}`}>
                <span className="chat__name">{message.name} </span>{message.message}
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                 </p>
                ))}
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