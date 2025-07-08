import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ApplyJob from "./Pages/ApplyJob..jsx";
import Home from "./Pages/Home.jsx";
import RecruiterLogin from "./component/RecruiterLogin.jsx";
import {AppContext} from "./context/AppContext.jsx";
import ViewApplications from "./Pages/ViewApplications.jsx";
import ManageJobs from "./Pages/ManageJobs.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import AddJob from "./Pages/AddJob.jsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const {showRecruiterLogin, companyToken} = useContext(AppContext)


    return (
        <div>
            {showRecruiterLogin && <RecruiterLogin/>}
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/applications" element={<Application/>}/>
                <Route path="/apply-job/:id" element={<ApplyJob/>}/>

                <Route path='/dashboard' element={<Dashboard/>}>
                    <Route
                        path='add-job'
                        element={companyToken ? <AddJob/> : <Navigate to="/" replace/>}
                    />
                    <Route
                        path='manage-jobs'
                        element={companyToken ? <ManageJobs/> : <Navigate to="/" replace/>}
                    />
                    <Route
                        path='job-list'
                        element={companyToken ? <ViewApplications/> : <Navigate to="/" replace/>}
                    />
                </Route>
            </Routes>
        </div>
    )
};

export default App;
