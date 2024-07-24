import { ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react'
import ToUsdtModal from './ToUsdtModal';

const QcaUsdt = () => {
    const [toUSDTModal, setToUSDTModal] = useState(true);

    const closeModal = () => {
        setToUSDTModal(false);
    }
    const confirmModal = () => {
        setToUSDTModal(false);
    }
    return (
        <div className='mt-4 w-full md:w-[500px]'>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center'>
                <div className='w-full'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={100} className='w-full bg-transparent border-0 border-b outline-none text-3xl' />
                        {/* <button className='text-secondary text-sm'>MAX</button> */}
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Convert upto: 8.5 $QMGT</div>
                </div>
            </div>
            <button className='p-1 -mt-2 m-auto border-primary border-2 rounded-full text-primary flex justify-between items-center  absolute left-[50%] translate-x-[-50%] cursor-default'><ArrowUpDown /></button>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center mt-4'>
                <div className='w-full'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={100} className='w-full bg-transparent border-0 border-b outline-none text-3xl' />
                        {/* <button className='text-secondary text-sm'>MAX</button> */}
                    </div>
                    {/* <div className='mt-2 text-secondary text-xs'>Recieved USDT: $99.29</div> */}
                </div>
            </div>

            <div>
                <button className='w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary' onClick={()=>setToUSDTModal(true)}>Convert</button>
            </div>

            {toUSDTModal && <ToUsdtModal closeModal={closeModal} confirmModal={confirmModal} />}
        </div>
    )
}

export default QcaUsdt