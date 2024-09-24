import React, {useState} from 'react';
import TextFields from '../../shared/form/textField';
import Buttons from '../../shared/button';
import { useDispatch } from 'react-redux';
import { updateStep } from '../../redux/actions/stepActions';
import SelectFields from '../../shared/form/selectField';

function BorrowerDetails (props) {
    const {step, data} = props;
    const dispatch = useDispatch();
    const [borrowerDetails, setBorrowerDetails] = useState({});
    const [genderSelection, setGenderSelection] = useState('');

    const handleBorrowerData = (e, key) => {

    };
    const nextDetailHandler = () => {
        if(step === 'promotersInformation') {
            dispatch(updateStep('businessInformation'));
        }
    }

    return (
        <div className="bg-white px-4 pt-0 pb-4 md:p-4 xs:max-md:pb-28">
            <div className="container mx-auto max-w-[960px]">
                <div className="flex flex-wrap">
                    {
                        data?.stepsMeta[step]?.fields?.properties && 
                        Object.entries(data.stepsMeta[step].fields.properties)
                            .sort((a, b) => a[1].order - b[1].order)
                            .map(([key, item]) => {
                            return (
                                <div className="flex-[0_100%] md:flex-[50%_50%_0%] p-0 md:pl-6 md:pr-6" key={key}>
                                    {
                                        item.type === "CustomSelectPopup" ?
                                        <SelectFields 
                                            id={item.id}
                                            label={item.label}
                                            options={item.list}
                                            name={item.id}
                                            className="font-semibold"
                                        /> :
                                        <TextFields 
                                            label={item.label || <span dangerouslySetInnerHTML={{ __html: item.htmlLabel }} />}
                                            id={item.id || key} 
                                            type={item.type === "string" ? "text" : item.type} 
                                            name={key} 
                                            placeholder={item.placeholder || ''} 
                                            value={borrowerDetails[key] || ''}
                                            onChange={(e) => handleBorrowerData(e, key)}
                                            className="font-semibold"
                                        />
                                    }
                                </div>
                            );
                        })
                    }
                    <div className="flex-[100%_0%] mt-10 pl-0 md:pl-6 xs:max-md:fixed xs:max-md:bottom-0 xs:max-md:left-0 xs:max-md:right-0 xs:max-md:bg-white xs:max-md:mt-0 xs:max-md:text-center xs:max-md:p-5 xs:max-md:shadow-gray-400 xs:max-md:shadow">
                        <Buttons label={data?.stepsMeta[step]?.nextButtonLabel} disabled="" variant="secondary" type="button" id="next-step" className="w-[200px] font-semibold text-md xs:max-md:w-full" clickHandler={nextDetailHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowerDetails;