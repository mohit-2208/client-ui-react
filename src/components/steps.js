import React, { useState, useEffect } from 'react';
import PromoterDetails from './promoter-details';
import { useDispatch, useSelector } from 'react-redux';
import { getStepsData } from '../redux/actions/stepActions';
import Loader from '../shared/loader/loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StepSwitcher() {
    const [step, setStep] = useState(null);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.getStepsReducer);

    useEffect(() => {
        dispatch(getStepsData('/customer-loan-application/236993de-9042-42a1-af9a-bf17cea32f12?timestamp=1723639466636'));
    }, [dispatch]);

    useEffect(() => {
        setStep(data?.data?.step);
    }, [data])

    const renderComponent = () => {
        switch (data?.data?.step) {
            case 'prePromotersInformation':
            case 'promotersInformation':
                return <PromoterDetails step={step} data={data?.data} />;
            case 2:
                return null;
            default:
                return null;
        }
    };

    console.log(data)

    return (
        <>
            <header className="bg-white py-5 pl-6 pr-6">
                <div className="container mx-auto max-w-[960px]"></div>
            </header>
            <div className="container mx-auto max-w-[960px] flex justify-between items-center py-5 pl-6 pr-6">
                <h2 className="text-[18px] font-semibold">{data?.data?.stepsMeta[step]?.label}</h2>
                <div className="text-[15px]">Your Information is <span className="text-green">100% Secure</span></div>
            </div>
            {loading ? <Loader /> : error ? <ToastContainer /> : renderComponent()}
        </>
    );
}

export default StepSwitcher;
