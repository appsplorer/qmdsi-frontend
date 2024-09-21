import { ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react'
import ToUsdtModal from './ToUsdtModal';
import ToCryptoModal from './ToCryptoModal';
import Select from 'react-select'
import ToRwbModal from './ToRwbModal';
import Iframe from 'react-iframe';
import SmartTradeModal from './SmartTradeModal';

const SmartTradeComp = () => {

    const [confirmModal, setConfirmModal] = useState(true);

    const closeModal = () => {
        setConfirmModal(false);
    }
    const resultModal = () => {
        setConfirmModal(false);
    }

    const tableData = [
        {
            "company": "Nigrakon",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
            "stake": "$1000",
            "apr": "12%",
            "collateral": "Y",
            "vesting": "3 Yrs",
            "status": "Open",
            "remaining": "$8000",
            "distributed": "$8000",
            "link": "#"
        }
    ];
    return (
        <div className='mt-4 w-full overflow-auto  bg-accent rounded-md px-4 py-4 text-white'>
            <div className='w-full flex items-center gap-4'>
                <div className='w-[200px]'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' className='w-full bg-transparent border outline-none text-xl px-2 py-2' placeholder='Enter Amount' />
                    </div>
                </div>
                <h1 className='font-bold text-xl'>=</h1>
                <div className='w-[200px]'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' className='w-full bg-transparent border outline-none text-xl px-2 py-2' placeholder='0.0 QMT' />
                    </div>
                </div>
                <div className='w-[200px]'>
                    <div className='flex gap-4 items-end'>
                        <button className=' h-[50px] w-full px-4 bg-primary rounded hover:bg-secondary'>
                            Convert
                        </button>
                    </div>
                </div>
            </div>
            <div>Convert Upto 8.5 QMT</div>

            <div className='w-full mt-6'>
                <Iframe url="https://www.tradingview.com/chart/?symbol=BITSTAMP%3ABTCUSD"
                    width="100%"
                    height="320px"
                    id=""
                    className=""
                    display="block"
                    position="relative" />
            </div>

            {confirmModal && <SmartTradeModal closeModal={closeModal} confirmModal={resultModal} />}
        </div>
    )
}

export default SmartTradeComp