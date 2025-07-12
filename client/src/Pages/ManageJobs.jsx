import React, {useContext, useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"; // Ensure `react-toastify` is installed
import axios from "axios";
import {AppContext} from "../context/AppContext";
import Loading from "../component/Loading.jsx"; // Assuming proper context is setup

const ManageJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(false);
    const {backendUrl, companyToken} = useContext(AppContext);

    // Function to fetch company Job Application data
    const fetchCompanyJobs = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/company/job-list`, {
                headers: {token: companyToken},
            });

            if (data.success) {
                setJobs(data.jobsData.reverse()); // Keep newest jobs first
                console.log(data.jobsData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("No job found");
            toast.error("Failed to fetch jobs. Please try again later.");
        }
    };

    // Function to change job visiblity
    const changeJobVisiblity = async (id) => {
        try {
            const {data} = await axios.post(
                backendUrl + "/api/company/change-visiblity",
                {
                    id,
                },
                {
                    headers: {token: companyToken},
                }
            );
            if (data.success) {
                toast.success(data.message)
                fetchCompanyJobs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobs();
        }
    }, [companyToken]);

    if (!jobs) {
        // Data is still loading
        return <Loading/>;
    }

    if (jobs.length === 0) {
        // Data loaded, but no jobs
        return (
            <div className="container p-8 max-w-5xl flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold text-gray-700 mb-2">No Jobs Found</h2>
                <p className="text-lg text-gray-500 mb-6">
                    You haven’t posted any jobs yet. Click below to add your first one!
                </p>
                <button
                    onClick={() => navigate("/dashboard/add-job")}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Add New Job
                </button>
            </div>

        );
    }

    return (
        <div className="container p-4 max-w-5xl">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
                        <th className="py-2 px-4 border-b text-left">Job Title</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
                        <th className="py-2 px-4 border-b text-center">Applicants</th>
                        <th className="py-2 px-4 border-b text-left">Visible</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index} className="text-gray-700">
                            <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{job.title}</td>
                            <td className="py-2 px-4 border-b max-sm:hidden">
                                {moment(job.date).format("LL")}
                            </td>
                            <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                            <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    className="scale-125 ml-4"
                                    type="checkbox"
                                    checked={job.visible}
                                    onChange={() => changeJobVisiblity(job._id)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate("/dashboard/add-job")}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    Add New Job
                </button>
            </div>
        </div>
    );
};

export default ManageJobs;