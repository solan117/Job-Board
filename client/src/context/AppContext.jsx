import {createContext, useEffect, useState} from "react";
import {jobsData} from "../assets/assets.js";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)

    const [companyData, setCompanyData] = useState(null)


    const fetchJobs = async () => {
        try {
            setJobs(jobsData)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchJobs()
    }, []);

    const value = {
        setIsSearched, setSearchFilter,
        isSearched, searchFilter,
        setJobs, jobs,
        showRecruiterLogin, setShowRecruiterLogin,
        setCompanyToken, companyToken,
        setCompanyData, companyData,
        backendUrl,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}