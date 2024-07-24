import { Cross, Ellipsis, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navigation = () => {
    const [showModal, setShowModal] = useState(false);
    const [navShow, setNavShow] = useState(false);
    console.log(navShow);
    const closeModal = () => {
        console.log();
        setShowModal(false);
    };
    return (
        <div><div className='px-4 md:px-24 py-4 text-white flex justify-between items-center'>
            <div className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                <a href=''>Logo</a>
                <div className={`nav-links duration-500 md:static bg-background absolute  md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5 z-1000 md:z-0 ${navShow ? 'top-0' : ''}` }>
                    <div className='absolute right-10 top-10 md:hidden justify-end'> <button onClick={()=>setNavShow(false)}><X /></button></div>
                    <ul className='nav md:flex md:gap-4'>
                        <li><NavLink to="/">Swap</NavLink></li>
                        <li><NavLink to="/pool">Pool</NavLink></li>
                        <li><NavLink to="/vote">Vote</NavLink></li>
                        <li><NavLink to="/qms">QMS</NavLink></li>
                        <li><NavLink to="/qca">QCA</NavLink></li>
                        <li><NavLink to="/smart-trade">Smart Trade</NavLink></li>
                    </ul>

                </div>
            </div>
            <div className="nav-right text-sm flex gap-2">
                <button className='bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary' onClick={() => { setShowModal(true) }}>Connect to Wallet</button>
                <button className='bg-accent py-1 px-3 rounded hover:bg-black h-[35px]' onClick={() => { setNavShow(true) }}><Ellipsis /></button>
            </div>
        </div>

            {showModal && <LoginModal closeModal={closeModal} />}</div>

    );
};

export default Navigation;