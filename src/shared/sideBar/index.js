import React from "react";
import LogoDark from '../../assets/images/logo-dark.png';
import bigCompany from '../../assets/images/icon-big-company.png';
import { NavLink } from "react-router-dom";

export default function Sidebar () {

    const handleLogout = () => {
        localStorage.removeItem('invoice_discounting_token');
    };
    return(
        <div>
            <figure className="text-center pt-5 pb-5 border-b-[1px] border-slate-200">
                <img src={LogoDark} alt="Indifi Technologies" className="inline-block" />
            </figure>
            <figure className="text-center pt-8 pb-8 border-b-[1px] border-slate-200">
                <img src={bigCompany} alt="Big Company" className="inline-block w-[70px] h-[70px]" />
            </figure>
            <ul>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => "px-5 py-5 uppercase block border-b-[1px] border-slate-200 text-slate-700" + (isActive ? " active-link bg-white text-slate-900 font-semibold" : "")}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({ isActive }) => "px-5 py-5 uppercase block border-b-[1px] border-slate-200 text-slate-700" + (isActive ? " active-link bg-white text-slate-900 font-semibold" : "")} onClick={handleLogout}>
                        Logout
                    </NavLink>
                </li>
            </ul>

        </div>
    )
}