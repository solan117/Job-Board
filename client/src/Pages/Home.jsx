import React from 'react';
import Navbar from "../component/Navbar.jsx";
import Hero from "../component/Hero.jsx";
import JobListing from "../component/JobListing.jsx";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <JobListing/>
        </div>
    );
};

export default Home;