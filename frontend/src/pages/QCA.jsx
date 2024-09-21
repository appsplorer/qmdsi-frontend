import React, { useState } from 'react'
import { GitCompare, RefreshCcw } from 'lucide-react';
import QcaUsdt from '../components/QcaUsdt';
import QcaCrypto from '../components/QcaCrypto';
import QcaRwb from '../components/QcaRwb';

const QCA = () => {
    const [tab, setTab] = useState('USDT');
    
    return (
        <div className='px-4 md:px-24 pt-4 h-full'>

            <div className='border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center'>
                <div className=' mt-36 flex flex-col items-center'>
                    <div className='flex justify-between text-white items-center w-full flex-wrap  md:w-[500px] gap-x-4'>

                        <button onClick={() => { setTab('USDT') }} className={tab === 'USDT' ? 'bg-primary text-black rounded px-4 py-2 mt-2' : 'bg-secondary text-black rounded px-4 py-2 mt-2'}>Convert to USDT</button> 
                        <button onClick={() => { setTab('CRYPTO') }} className={tab === 'CRYPTO' ?  'bg-primary text-black rounded px-4 py-2 mt-2' : 'bg-secondary text-black rounded px-4 py-2 mt-2'}>Convert to Crypto</button> 
                        <button onClick={() => { setTab('RWB') }} className={tab === 'RWB' ? 'bg-primary text-black rounded px-4 py-2 mt-2' : 'bg-secondary text-black rounded px-4 py-2 mt-2'}>Convert to RWB</button>

                    </div>
                    {tab === 'USDT' && <QcaUsdt />}
                    {tab === 'CRYPTO' && <QcaCrypto />}
                    {tab === 'RWB' && <QcaRwb />}
                </div>
            </div>

            <div className='hollow-text z-100 touch-none'>QCA</div>
        </div>
    )
}

export default QCA