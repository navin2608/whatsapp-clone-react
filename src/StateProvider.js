import React,{createContext,useContext,useReducer} from 'react';
export const StateContext=createContext(); //preparing the data layer where everything lives
export const StateProvider=({reducer,initialState,children})=>(   //datalayer higher order component takes 3 components
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
export const useStateValue=()=>useContext(StateContext); // to pull information from data layer