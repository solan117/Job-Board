import React, {useContext, useEffect, useState} from 'react'
import {assets, viewApplicationsPageData} from '../assets/assets'
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import Loading from "../component/Loading.jsx";
import {toast} from "react-toastify";

const ViewApplications = () => {


    const {backendUrl, companyToken} = useContext(AppContext)
    const [applications, setApplications] = useState(false)

    //Fetch company job application data
    const fetchCompanyJobApplications = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/company/applicants`,
                {headers: {token: companyToken}})
            if (data.success) {
                setApplications(data.applications.reverse())
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Update Job Application Status
    const changeApplicationStatus = async (id, status) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/company/change-status`,
                {id, status},
                {headers: {token: companyToken}})

            if (data.success) {
                fetchCompanyJobApplications()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobApplications()
        }
    }, [companyToken]);


    if (!applications) {
        return <Loading/>;
    }

    if (applications.length === 0) {
        return (
            <div className="container mx-auto p-8 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold text-gray-700 mb-2">No Applications Yet</h2>
                <p className="text-lg text-gray-500 mb-6">
                    You haven’t received any job applications yet.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div>
                <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
                    <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left">#</th>
                        <th className="py-2 px-4 text-left">User name</th>
                        <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                        <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                        <th className="py-2 px-4 text-left">Resume</th>
                        <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications
                        .filter(item => item.jobId && item.userId)
                        .map((applicant, index) => (
                            <tr key={index} className="text-gray-700">
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-center flex items-center gap-3">
                                    <img
                                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                                        src={applicant.userId.image}
                                        alt={`${applicant.userId.name}'s profile`}
                                    />
                                    <span>{applicant.userId.name}</span>
                                </td>
                                <td className="py-2 px-4 border-b max-sm:hidden">{applicant.jobId.title}</td>
                                <td className="py-2 px-4 border-b max-sm:hidden">{applicant.jobId.location}</td>
                                <td className="py-2 px-4 border-b transform scale-95">
                                    <a
                                        href={applicant.userId.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                                    >
                                        Resume
                                        <img
                                            src={assets.resume_download_icon}
                                            alt="Download Resume Icon"
                                            className="w-4 h-4"
                                        />
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b relative">
                                    {applicant.status === 'Pending' ? (
                                        <div className="relative inline-block text-left group">
                                            <button className="text-gray-500 focus:outline-none">...</button>
                                            <div
                                                className="z-10 hidden absolute right-0 md:left-0 top-8 w-32 bg-white border border-gray-200 rounded shadow group-hover:block group-focus-within:block">
                                                <button
                                                    onClick={() => changeApplicationStatus(applicant._id, 'Accepted')}
                                                    className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => changeApplicationStatus(applicant._id, 'Rejected')}
                                                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <span
                                            className={
                                                applicant.status === 'Accepted'
                                                    ? 'text-blue-500 font-semibold'
                                                    : applicant.status === 'Rejected'
                                                        ? 'text-red-500 font-semibold'
                                                        : 'text-gray-500'
                                            }
                                        >
                                            {applicant.status}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewApplications