import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import MainWindow from "./Components/MainWindow";
import Startbar from "./Components/Startbar";
import Icons from "./Components/Icons";
function App() {




  if (window.innerWidth > 600){
    return (<>
      <code className="Background"></code>
      <Icons></Icons>
      
      <MainWindow></MainWindow>
   
      <Startbar></Startbar>
      </>)
  }
  else{
  return (
    

<MainWindow mob={true}></MainWindow>

    
  );
}}

export default App;
