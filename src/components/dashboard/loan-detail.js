import React from 'react';
import { dateFormatter } from '../../commonHelpers/utils.js';
import { useNavigate } from 'react-router-dom';

export default function LoanDetails(props) {
    const { item } = props;
    let appState;
    const navigate = useNavigate();
    const params = {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null, 
        step: null, 
        oneMoneyStatus: null
    }

    switch (item.application.state) {
        case 'rejected':
            appState = 'Application Rejected';
            break;
        case 'lead':
        case 'new':
        case 'pending_review':
            appState = 'Loan Requested';
            break;
        case 'pending_documentation':
        case 'ready_for_disbursal':
        case 'loan_active':
        case 'loan_overdue':
            appState = 'Loan Sanctioned';
            break;
        default:
            appState = '';
            break;
    }

    const AppCommons = {
        isInvoiceDiscountingApp: (requestType) => {
            return ["Invoice Factoring", "Invoice Discounting"].includes(requestType);
        }
    };

    const header = ( req_id ) => {
        return (
            <h3 className="flex justify-between border-b-[1px] text-gray-600 pb-2 border-slate-200">
                Loan Application <span className="text-base">IND{req_id}</span>
            </h3>
        )
    }

    const LoanComponent = ({ loanRequest }) => {
        const filteredLenders = loanRequest.lenders.filter(lender => 
            lender.offer_date && 
            lender.offer_accepted && 
            !lender.is_offer_modified
        );
      
        const selectedLender = filteredLenders.find(lender => 
            lender.id === loanRequest.loan.lender_id
        );
      
        return (
            selectedLender ? (
                <div>
                    <span className="block text-center text-xl text-[#4a6eb0]">
                        {selectedLender.offer_amount}
                    </span>
                    <span className="text-sm text-slate-500">{appState}</span>
                </div>
            ) : null
        );
    };

    const LoanDetail = ({ loanRequest }) => {
        return (
            <ul>
                {loanRequest.lenders
                    .filter(
                    (lender) =>
                        lender.offer_date &&
                        lender.offer_accepted &&
                        !lender.is_offer_modified &&
                        lender.id === loanRequest.loan.lender_id
                    )
                    .map((lender) => (
                        <li key={lender.id} className="flex justify-around border-t-[1px] text-gray-600 mt-4 pt-4 pb-4 border-slate-200">
                            <div className="text-center">
                                <span className="block text-xl text-[#4a6eb0]">{lender.name}</span>
                                <span className="text-sm text-slate-500">Lender</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl text-[#4a6eb0]">
                                    {lender.offer_interest_rate}%
                                </span>
                                <span className="text-sm text-slate-500">Interest</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl text-[#4a6eb0]">
                                    {lender.offer_duration} {loanRequest.request_type === "Instant Credit" ? "Days" : "Months"}
                                </span>
                                <span className="text-sm text-slate-500">Duration</span>
                            </div>
                        </li>
                    ))
                }

                {loanRequest.application.state === "ready_for_disbursal" && (
                    <li className="flex justify-around border-t-[1px] text-gray-600 pt-4 pb-4 border-slate-200">
                        <div className="text-center">
                            <div className="text-[#FF9800] text-2xl font-semibold">
                                {loanRequest.loan.disbursed_amount}
                            </div>
                            <span className="text-sm text-slate-500">Amount Disbursed</span>
                        </div>
                        <div className="text-center">
                            <div>
                                {loanRequest.loan.in_process_amount}
                            </div>
                            <span className="text-sm text-slate-500">Amount In Process</span>
                        </div>
                        <div className="text-center">
                            <div className="text-[#8AC73B] text-2xl font-semibold" title={loanRequest.loan.remaining_amount}>
                                {loanRequest.loan.remaining_amount}
                            </div>
                            <span className="text-sm text-slate-500">Amount Pending</span>
                            {loanRequest.loan.sync_date && (
                                <span className="text-sm text-slate-500 pt-2 block">
                                    Last Synced:{" "}
                                    <time>
                                        {new Date(loanRequest.loan.sync_date).toLocaleString()}
                                    </time>
                                </span>
                            )}
                        </div>
                    </li>
                )}

                {(loanRequest.application.state === "loan_active" || loanRequest.application.state === "loan_overdue") && (
                    <li className="flex justify-around border-t-[1px] text-gray-600 pt-4 pb-4 border-slate-200">
                        <div>
                            Loan Disbursed
                        </div>
                    </li>
                )}
            </ul>
        );
    };

    const showApplicationDetails = (application, requestType) => {
        if (AppCommons.isInvoiceDiscountingApp(requestType) &&
            ["disbursed", "loan_active", "ready_for_disbursal"].includes(application.state)) {
            // Navigate to invoice workflow dashboard
            // navigate(`/home/invoice-workflow-vendor/dashboard/${application.id}`);
            console.log('Navigate to invoice workflow dashboard')
        } else {
            // Navigate to general workflow
            navigate({
                pathname: `/instant-loan/application/${application.id}`,
                search: new URLSearchParams(params).toString(),
            });
        }
    };
    
    return (
      <>
        {item.application.state === "lead" ||
        item.application.state === "new" ||
        item.application.state === "rejected" ||
        item.application.state === "pending_review" ? (
            <li className="border border-slate-200 p-5 rounded-lg shadow-md cursor-pointer mb-4" onClick={() => showApplicationDetails(item.application, item.request_type)}>
                {header(item.application.request_id)}
                <div className="flex justify-between pt-3">
                    <div>
                        <span className="block">{item.borrower.name}</span>
                        <span className="text-sm text-slate-500">
                            Applied on: {dateFormatter(item.application.created)}
                        </span>
                    </div>
                    <div>
                        <span className="block text-center text-xl text-[#4a6eb0]">
                            {item.application.amount || item.application.applied_amount}
                        </span>
                        <span className="text-sm text-slate-500">{appState}</span>
                    </div>
                </div>
            </li>
        ) : item.application.state === "pending_documentation" ||
            item.application.state === "ready_for_disbursal" ||
            item.application.state === "loan_active" ||
            item.application.state === "loan_overdue" ? (
                <li className="border border-slate-200 p-5 rounded-lg shadow-md cursor-pointer mb-4" onClick={() => showApplicationDetails(item.application, item.request_type)}>
                    {header(item.application.request_id)}
                    <div className="flex justify-between pt-3">
                        <div>
                            <span className="block">{item.borrower.name}</span>
                            <span className="text-sm text-slate-500">
                                Applied on: {dateFormatter(item.application.created)}
                            </span>
                        </div>
                        <LoanComponent loanRequest={item} />
                    </div>
                    <LoanDetail loanRequest={item} />
                </li>
        ) : (
            <li className="border border-slate-200 p-5 rounded-lg shadow-md cursor-pointer mb-4" onClick={() => showApplicationDetails(item.application, item.request_type)}>
                {header(item.application.request_id)}
                <div className="flex justify-between pt-3">
                    <div>
                        <span className="block">{item.borrower.name}</span>
                        <span className="text-sm text-slate-500">
                            Applied on: {dateFormatter(item.application.created)}
                        </span>
                    </div>
                    <div>
                        <span className="block text-center text-xl text-[#4a6eb0]">
                            {item.application.amount || item.application.applied_amount}
                        </span>
                        <span className="text-sm text-slate-500">{appState}</span>
                    </div>
                </div>
            </li>
        )}
      </>
    );
}