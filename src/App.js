
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import {useState} from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './Login.js';
import {useStateValue} from "./StateProvider.js";
function App() {
  const [{user},dispatch]=useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      {!user?<Login />:
     <div className="app__body">
       <Router>
         <Routes>
           <Route path="/rooms/:roomId"
             element={ <><Sidebar /> <Chat /></>}
         />
         <Route path="/"
           element={ <><Sidebar /> {/* <Chat /> */}</>}
         />
         </Routes>
       </Router>  
     </div>}
    </div>
  );
}

export default App;
