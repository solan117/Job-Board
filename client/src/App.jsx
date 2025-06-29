import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ApplyJob from "./Pages/ApplyJob..jsx";
import Home from "./Pages/Home.jsx";
import RecruiterLogin from "./component/RecruiterLogin.jsx";
import {AppContext} from "./context/AppContext.jsx";
import ViewApplications from "./Pages/ViewApplications.jsx";
import ManageJobs from "./Pages/ManageJobs.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import AddJob from "./Pages/AddJob.jsx";

const App = () => {

    const {showRecruiterLogin} = useContext(AppContext)


    return (
        <div>
            {showRecruiterLogin && <RecruiterLogin/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/applications" element={<Application/>}/>
                <Route path="/apply-job/:id" element={<ApplyJob/>}/>

                <Route path='/dashboard' element={<Dashboard/>}>
                    <Route path='add-job' element={<AddJob/>}/>
                    <Route path='manage-jobs' element={<ManageJobs/>}/>
                    <Route path='view-applications' element={<ViewApplications/>}/>
                </Route>
            </Routes>
        </div>
    )
};

export default App;
