import React, { useEffect,useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import db from './firebaseconfig.js'
import {Link} from "react-router-dom";
function SidebarChat({addNewChat,id,name}){
    const [seed, setSeed]=useState('');
    const [messages,setMessages]=useState("");
    useEffect(()=>{
            if(id){
                db.collection("rooms").doc(id).collection
                ('messages').orderBy('timestamp',"desc").onSnapshot(snapshot=>{
                    setMessages(snapshot.docs.map((doc)=>doc.data()))
                })
            }                         
    },[id])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);
    const createChat=()=>{
        const roomName= prompt("Please enter name for Chat Group");
        if(roomName){
            //database stuff
            db.collection('rooms').add({
                name:roomName,
            })
        }
    };
    return !addNewChat?(
        <Link to={`/rooms/:${id}`}>
                 <div className="sidebarChat">
            <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg`}></Avatar>
           <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
           </div>
        </div>
        </Link>
       
    ):(<div onClick={createChat} className="sidebarChat"><h2>  + Create new Group</h2></div>)
    }
export default SidebarChat;