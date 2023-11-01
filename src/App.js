import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import React,{useState} from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './Login.js';
import {useStateValue} from "./StateProvider";
function App() {
  const [{user},dispatch]=useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      {!user?(<Login />):
     (<div className="app__body">
       <Router>
       <Sidebar />
         <Routes>
           <Route path="/rooms/:roomId"
             element={ <><Chat /></>}
         />
         <Route path="/"
           element={ <>{<Chat />}</>}
         />
         </Routes>
       </Router>  
     </div>)}
    </div>
  );
}

export default App;
