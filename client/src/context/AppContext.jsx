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

    const [companyToken, setCompanyToken] = useState(
        () => localStorage.getItem('companyToken') || null
    );

    // ✅ Initialize from localStorage
    const [companyData, setCompanyData] = useState(() => {
        const stored = localStorage.getItem('companyData');
        return stored ? JSON.parse(stored) : null;
    });

    const fetchJobs = async () => {
        try {
            setJobs(jobsData)
        } catch (e) {
            console.log(e);
        }
    }

    // Sync localStorage when token changes
    useEffect(() => {
        if (companyToken) {
            localStorage.setItem('companyToken', companyToken);
        } else {
            localStorage.removeItem('companyToken');
        }
    }, [companyToken]);


    useEffect(() => {
        if (companyData) {
            localStorage.setItem('companyData', JSON.stringify(companyData));
        } else {
            localStorage.removeItem('companyData');
        }
    }, [companyData]);

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }

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