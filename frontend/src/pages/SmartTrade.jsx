import React, { useState } from 'react'
import { GitCompare, RefreshCcw } from 'lucide-react';
import SmartTradeComp from '../components/SmartTradeComp';

const SmartTrade = () => {
    return (
        <div className='px-4 md:px-24 pt-4 h-full'>

            <div className='border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center'>
                <div className='w-full md:w-full lg:w-[1200px] mt-36'>
                    <div className='flex justify-between text-white items-center'>
                        <div>Smart Trade</div>
                        <div className='flex gap-2'>
                            <button className='text-[14px] flex gap-2 bg-black p-1 px-2 rounded-full items-center '> Available : 100 $QMT</button>
                        </div>
                    </div>
                    <SmartTradeComp />
                </div>
            </div>

            <div className='hollow-text z-100 touch-none'>TRADE</div>
        </div>
    )
}

export default SmartTrade