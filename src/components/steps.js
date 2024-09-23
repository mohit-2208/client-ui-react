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

function StepSwitcher() {
    const [step, setStep] = useState(null);
    const [meData, setMeData] = useState(null);
    const dispatch = useDispatch();
    const { data, loading, error, currentStep } = useSelector((state) => state.getStepsReducer);

    useEffect(() => {
        dispatch(getStepsData('/customer-loan-application/26b68b7f-100e-4afb-8f8c-6ea281a0040e', step));
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
            <header className="bg-white py-5 pl-6 pr-6">
                <div className="container mx-auto max-w-[960px]">{currentStep}</div>
            </header>
            <div className="container mx-auto max-w-[960px] flex-none md:flex justify-between items-center p-4 md:pl-6 md:pr-6 md:py-5">
                <h2 className="text-[18px] font-semibold">{data?.data?.stepsMeta[step]?.label}</h2>
                <div className="text-[11px] md:text-[15px]">Your Information is <span className="text-green">100% Secure</span></div>
            </div>
            {loading ? <Loader /> : error ? <ToastContainer /> : renderComponent()}
        </>
    );
}

export default StepSwitcher;
