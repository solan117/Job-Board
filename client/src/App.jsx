import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ApplyJob from "./Pages/ApplyJob..jsx";
import Home from "./Pages/Home.jsx";
import RecruiterLogin from "./component/RecruiterLogin.jsx";
import {AppContext} from "./context/AppContext.jsx";

const App = () => {

    const {showRecruiterLogin} = useContext(AppContext)


    return (
        <div>
            {showRecruiterLogin && <RecruiterLogin/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/applications" element={<Application/>}/>
                <Route path="/apply-job/:id" element={<ApplyJob/>}/>
            </Routes>
        </div>
    )
};

export default App;
