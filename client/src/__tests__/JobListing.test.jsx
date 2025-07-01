import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import JobListing from '../component/JobListing';
import {AppContext} from '../context/AppContext';
import {MemoryRouter} from 'react-router-dom';


const mockJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        location: "Remote",
        category: "Engineering",
        companyId: {
            _id: 'company1',
            name: "Mock Company 1",
            image: "company_icon.svg",  // mock image string
        },
        description: "<p>Frontend job description sample</p>",
    },
    {
        id: 2,
        title: "Backend Developer",
        location: "New York",
        category: "Engineering",
        companyId: {
            _id: 'company2',
            name: "Mock Company 2",
            image: "company_icon.svg",
        }, description: "<p>Frontend job description sample</p>",
    },
    {
        id: 3,
        title: "Product Manager",
        location: "San Francisco",
        category: "Management",
        companyId: {
            _id: 'company3',
            name: "Mock Company 3",
            image: "company_icon.svg",
        },
        description: "<p>Frontend job description sample</p>",
    }
];


vi.mock('../assets/assets', () => ({
    assets: {
        cross_icon: 'cross_icon.svg',
        left_arrow_icon: 'left_arrow_icon.svg',
        right_arrow_icon: 'right_arrow_icon.svg'
    },
    JobCategories: ['Engineering', 'Management'],
    JobLocations: ['Remote', 'New York', 'San Francisco']
}));

const renderWithContext = (overrideContext = {}) => {
    const defaultContext = {
        isSearched: true,
        searchFilter: {title: '', location: ''},
        setSearchFilter: vi.fn(),
        jobs: mockJobs,
    };

    return render(
        <MemoryRouter>
            <AppContext.Provider value={{...defaultContext, ...overrideContext}}>
                <JobListing/>
            </AppContext.Provider>
        </MemoryRouter>
    );
};

describe('JobListing Component', () => {
    test('renders all jobs by default', () => {
        renderWithContext();
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.getByText('Backend Developer')).toBeInTheDocument();
        expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });

    test('filters jobs by title from searchFilter', () => {
        renderWithContext({
            searchFilter: {title: 'frontend', location: ''}
        });

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
    });

    test('renders search filter tags if isSearched is true', () => {
        renderWithContext({
            searchFilter: {title: 'manager', location: 'San Francisco'}
        });

        expect(screen.getByText('manager')).toBeInTheDocument();
        const sanFranElements = screen.getAllByText('San Francisco');
        expect(sanFranElements.length).toBeGreaterThan(0);

    });
});
