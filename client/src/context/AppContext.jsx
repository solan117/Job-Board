import {createContext, useEffect, useState} from "react";
import {jobsData} from "../assets/assets.js";
import axios from "axios";
import {toast} from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {user} = useUser()
    const {getToken} = useAuth()

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

    const [userData, setUserData] = useState(null)

    const [userApplications, setUserApplications] = useState([])

    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();

            const {data} = await axios.get(backendUrl + '/api/users/user',
                {headers: {Authorization: `Bearer ${token}`}}
            )

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
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


    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    const value = {
        setIsSearched, setSearchFilter,
        isSearched, searchFilter,
        setJobs, jobs,
        showRecruiterLogin, setShowRecruiterLogin,
        setCompanyToken, companyToken,
        setCompanyData, companyData,
        backendUrl,
        setUserData,
        userData,
        userApplications,
        setUserApplications,
        fetchUserData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}