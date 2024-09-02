import React, {useState} from 'react';
import { Radio, RadioGroup } from '@headlessui/react'
import TextFields from '../../shared/form/textField';
import Buttons from '../../shared/button';
import { useDispatch } from 'react-redux';
import { updateStep } from '../../redux/actions/stepActions';

function PromoterDetails (props) {
    const {step, data} = props;
    const dispatch = useDispatch();
    const [promoterDetails, setPromoterDetails] = useState({
        pan: '',
        email: data?.businessRequest?.promoters[0]?.primary_contact?.email || ''
    });
    const [genderSelection, setGenderSelection] = useState('');

    const handlePromoterData = (e, key) => {
        setPromoterDetails((prevDetails) => ({
            ...prevDetails,
            [key]: e.target.value,
        }));
    };

    const nextDetailHandler = () => {
        dispatch(updateStep('promotersInformation'));
    }

    return (
        <div className="bg-white p-4">
            <div className="container mx-auto max-w-[960px]">
                <div className="flex flex-wrap">
                    {
                        data?.stepsMeta[step]?.fields?.properties && 
                        Object.entries(data.stepsMeta[step].fields.properties)
                            .sort((a, b) => a[1].order - b[1].order)
                            .map(([key, item]) => {
                            return (
                                <div className="flex-[50%_50%_0%] pl-6 pr-6" key={key}>
                                    {
                                        item.type === "chip_buttons" ?
                                        <div className="form-group mt-7 relative">
                                            <label className="text-sm mb-1.5 font-semibold block">Gender</label>
                                            <RadioGroup value={genderSelection} onChange={setGenderSelection} className="flex justify-between">
                                                {
                                                    item.list.map((list, index) => {
                                                        return(
                                                            <Radio
                                                                key={index}
                                                                value={list.value}
                                                                className="cursor-pointer border border-neutral-300 rounded px-3 py-3 text-sm data-[checked]:bg-black data-[checked]:text-white w-[30%] text-center font-semibold"
                                                            >
                                                                {list.name}
                                                            </Radio>
                                                        )
                                                    })
                                                }
                                            </RadioGroup>
                                        </div> :
                                        <TextFields 
                                            label={item.label} 
                                            id={item.id || key} 
                                            type={item.type === "string" ? "text" : item.type} 
                                            name={key} 
                                            placeholder={item.placeholder || ''} 
                                            value={promoterDetails[key] || ''}
                                            onChange={(e) => handlePromoterData(e, key)}
                                            className="font-semibold"
                                        />
                                    }
                                </div>
                            );
                        })
                    }
                    <div className="flex-[100%_0%] pl-6 pr-6 mt-10">
                        <Buttons label={data?.stepsMeta[step]?.nextButtonLabel} disabled="" variant="secondary" type="button" id="next-step" className="w-[200px] font-semibold text-md" clickHandler={nextDetailHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoterDetails;