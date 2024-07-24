import React, { useState } from 'react'
import TokenSwap from '../components/TokenSwap';
import CreditSwap from '../components/CreditSwap';
import { GitCompare, RefreshCcw } from 'lucide-react';

const Swap = () => {
  const [tokenSwap, setTokenSwap] = useState(true);
  return (
    <div className='px-4 md:px-24 pt-4 h-full'>
      
      <div className='border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center'>
        <div className='w-[500px] mt-36'>
          <div className='flex justify-between text-white items-center'>
            <div><button onClick={() => { setTokenSwap(true) }}>Token Swap</button> / <button onClick={() => { setTokenSwap(false) }}>Credit Card</button></div>
            <div className='flex gap-2'>
              <button className='text-[14px] flex gap-2 bg-black p-1 px-2 rounded-full items-center '><GitCompare className='w-[14px] text-primary' /> 0.5%</button>
              <button className='text-[14px] bg-black p-1 px-2 rounded-full'><RefreshCcw className='w-[14px] text-primary' /></button>
            </div>
          </div>
          {tokenSwap ? <TokenSwap /> : <CreditSwap />}
        </div>
      </div>
      
      <div className='hollow-text z-100 touch-none'>SWAP</div>  
    </div>
  )
}

export default Swap