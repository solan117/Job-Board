import React from "react";
import {Route, Routes} from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ApplyJob from "./Pages/ApplyJob..jsx";
import Home from "./Pages/Home.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/application" element={<Application/>}/>
                <Route path="/apply-job/:id" element={<ApplyJob/>}/>
            </Routes>
        </div>
    )
};

export default App;
