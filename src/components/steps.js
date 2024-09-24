import React, { useState, useEffect } from 'react';
import PromoterDetails from './promoter-details';
import { useDispatch, useSelector } from 'react-redux';
import { getStepsData } from '../redux/actions/stepActions';
import Loader from '../shared/loader/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiEndpoints from '../commonHelpers/apiEndpoints';
import { getData } from '../commonHelpers/api';
import BorrowerDetails from './borrower-details';
import LogoIcon from '../assets/icons/logo';

function StepSwitcher() {
    const [step, setStep] = useState(null);
    const [meData, setMeData] = useState(null);
    const dispatch = useDispatch();
    const { data, loading, error, currentStep } = useSelector((state) => state.getStepsReducer);

    useEffect(() => {
        dispatch(getStepsData('/customer-loan-application/0edd21a6-123b-4b63-86ce-876b430c6142', step));
    }, [dispatch]);

    useEffect(() => {
        setStep(data?.data?.step);
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData(apiEndpoints.me);
                setMeData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {}
        };
        fetchData();
    }, []);

    const renderComponent = () => {
        switch (data?.data?.step) {
            case 'prePromotersInformation':
            case 'promotersInformation':
                return <PromoterDetails step={step} data={data?.data} />;
            case 'businessInformation':
                return <BorrowerDetails step={step} data={data?.data} />;
            default:
                return null;
        }
    };

    console.log(data)

    return (
        <>
            <header className="bg-white">
                <div className="container mx-auto max-w-[960px] p-4 md:p-6 xs:max-md:text-center">
                    <LogoIcon />
                </div>
            </header>
            <div className="bg-[#F7F9FD] shadow shadow-gray-400">
                <div className="container mx-auto max-w-[960px] flex-none md:flex justify-between items-center p-4 md:p-6">
                    <h2 className="text-[16px] font-semibold md:text-[18px]">{data?.data?.stepsMeta[step]?.label}</h2>
                    <div className="text-[11px] md:text-[15px]">Your Information is <span className="text-green">100% Secure</span></div>
                </div>
            </div>
            {loading ? <Loader /> : error ? <ToastContainer /> : renderComponent()}
        </>
    );
}

export default StepSwitcher;
