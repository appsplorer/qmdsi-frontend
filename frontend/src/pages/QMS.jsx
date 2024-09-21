import React, { useState } from 'react'
import { GitCompare, RefreshCcw } from 'lucide-react';

const QMS = () => {
    return (
        <div className='px-4 md:px-24 pt-4 h-full'>

            <div className='border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center'>
                <div className='w-[500px] mt-36'>
                    <div className='flex justify-between text-white items-center'>
                        <div>Transfer to QMS</div>
                        <div className='flex gap-2'>
                            <button className='text-[14px] flex gap-2 bg-black p-1 px-2 rounded-full items-center '><GitCompare className='w-[14px] text-primary' /> 0.5%</button>
                            <button className='text-[14px] bg-black p-1 px-2 rounded-full'><RefreshCcw className='w-[14px] text-primary' /></button>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center'>
                            <div className='w-full'>
                                <div className='flex gap-4 items-end'>
                                    <input type='text' value={100} className='w-full bg-transparent border-0 border-b outline-none text-3xl' />
                                    {/* <button className='text-secondary text-sm'>MAX</button> */}
                                </div>
                                <div className='mt-2 text-secondary text-xs'>Wallet Balance: $99.29</div>
                            </div>
                        </div>

                        <div>
                            <button className='w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary' onClick={() => { }}>Transfer</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className='hollow-text z-100 touch-none'>QMS</div>
        </div>
    )
}

export default QMS