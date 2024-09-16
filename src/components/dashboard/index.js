import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../commonHelpers/api'; 
import Sidebar from '../../shared/sideBar';
import Notifications from './notifications';
import apiEndpoints from '../../commonHelpers/apiEndpoints.js';
import LoanDetails from './loan-detail.js';
import { useSelector } from 'react-redux';

const LoanListItem = ({ item }) => {
    return (
        <LoanDetails item={item} />
    );
};


const Dashboard = () => {
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.getUserDetailsReducer.userInfo);

    useEffect(() => {
        if (!localStorage.getItem("invoice_discounting_token")) {
            navigate('/login', { replace: true });
        }
    }, []); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getData(apiEndpoints.loan_requests, {
                    count: 100,
                    start: 0,
                });
                setResponseData(response);
            } catch (error) {
                console.error('Error fetching data in useEffect:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="w-full h-full text-center pt-20 text-2xl">Loading...</div>
    }

    return (
        <div className="flex">
            <div className="flex-[0_20%]">
                <Sidebar />
            </div>
            <div className="flex-[0_55%] border-r-[1px] border-l-[1px] border-slate-200 p-5 bg-white">
                <h2 className="mb-5 text-2xl text-gray-600">Status &amp; Details of Loan Application</h2>
                <ul>
                    {responseData?.data?.length > 0 ? (
                        responseData.data.map((item, index) => (
                            <LoanListItem item={item} key={index} />
                        ))
                    ) : (
                        <p>No loan applications found.</p>
                    )}
                </ul>
            </div>
            <div className="flex-[0_25%] bg-white">
                <Notifications />
            </div>
        </div>
    );
};

export default Dashboard;
