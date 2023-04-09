import './App.css';


import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Crousel from './components/Crousel';
import LoadingBar from 'react-top-loading-bar'

import { Routes, Route } from "react-router-dom"

const App =()=> {
  const apikey = process.env.REACT_APP_NEWS_API;
  
  const [Progress, setprogress] = useState(0);

  const setProgress= (progress)=>{
    setprogress(progress);
  }
    var a = 9;
    return (
      <div>
        <Navbar/>

          <LoadingBar
          color='#f11946'
          height={3}
          progress={Progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        
        
        {/* <Crousel/> */}
        <Routes>
        <Route exact strict path="/" element={ <News setProgress={setProgress} apikey={apikey} key="general"   pageSize={a} country="in" category="science"/> } />
        <Route exact strict path="/business" element={ <News setProgress={setProgress} apikey={apikey} key="business"  pageSize={a} country="in" category="business"/> } />
        <Route exact strict path="/entertainment" element={ <News setProgress={setProgress} apikey={apikey} key="entertainment"  pageSize={a} country="in" category="entertainment"/> } />
        <Route exact strict path="/general" element={ <News setProgress={setProgress} apikey={apikey} key="general"  pageSize={a} country="in" category="general"/> } />
        <Route exact strict path="/health" element={ <News setProgress={setProgress} apikey={apikey} key="health"  pageSize={a} country="in" category="health"/> } />
        <Route exact strict path="/science" element={ <News setProgress={setProgress} apikey={apikey} key="science"  pageSize={a} country="in" category="science"/> } />
        <Route exact strict path="/sports" element={ <News setProgress={setProgress} apikey={apikey} key="sports"  pageSize={a} country="in" category="sports"/> } />
        <Route exact strict path="/technology" element={ <News setProgress={setProgress} apikey={apikey} key="technology"  pageSize={a} country="in" category="technology"/> } />

        </Routes>
      </div>
    )
  
}





export default App;
