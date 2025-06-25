import React from 'react';
import Navbar from "../component/Navbar.jsx";
import Hero from "../component/Hero.jsx";
import JobListing from "../component/JobListing.jsx";
import AppDownload from "../component/AppDownload.jsx";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <JobListing/>
            <AppDownload/>
        </div>
    );
};

export default Home;