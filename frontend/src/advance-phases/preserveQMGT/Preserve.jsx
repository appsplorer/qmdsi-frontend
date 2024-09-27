// src/components/PreserveQMGT.tsx
import { Table } from 'antd';
import React from 'react';

const PreserveQMGTC = () => {

    const columns = [
        {title:'Date',dataIndex:'date'},
        {title:'Action',dataIndex:'action'},
        {title:'Amount',render:((v) => <p className={`${v.isSuccess ? 'text-green-700' : 'text-red-700'} font-bold`}>{v.amount}</p>),width:'200px'},
    ]
    const rawData = [
        {date:'2024-09-01',action:'Hedging Applied',amount:'-200 QMGT',isSuccess:false},
        {date:'2024-08-15',action:'Diversification',amount:'-150 QMGT',isSuccess:false},
        {date:'2024-07-30',action:'Staking Rewards',amount:'+50 QMGT',isSuccess:true},
        {date:'2024-09-10',action:'Preservation Applied',amount:'-1275 QMGT',isSuccess:false},
    ]
  return (
      <div className="mb-12 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Preserve Your QMGT</h2>
        <div className="my-8 bg-ash/20 text-white flex flex-col md:flex-row items-center justify-between p-4 rounded-lg">
          <div className="text-lg flex items-center gap-2 p-4 rounded-md">
            <img src="/public/tokenLogo.png" className='w-12' alt="" />
            <p className='flex flex-col'>Current QMGT Balance: <span className="font-bold text-green-600">100 QMGT</span></p>
          </div>
          <p className="text-lg flex flex-col">Amount to Preserve (85%): <span className="font-bold text-blue-600">85 QMGT</span></p>
        </div>

        <section className="my-4 text-white">
          <h3 className="text-2xl font-semibold text-white mb-2">Select Preservation Strategy:</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              Option 1: Hedging (Risk Mitigation)
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              Option 2: Diversification (Spread Across Assets)
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              Option 3: Staking (Earn Rewards)
            </label>
            <div className='mt-12'>
            <a href="#" className="text-blue-500 underline hover:text-blue-700">Learn More</a>
            </div>
          </div>
        </section>

        <div className="flex justify-center space-x-4 my-6 ">
          <button className="animated-button bg-golden border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-md">Preserve Now</button>
          <button className="animated-button bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition">Cancel</button>
        </div>

        <section className="my-4">
          <h3 className="text-2xl font-semibold text-white mb-2">Transaction History</h3>
          <Table className='custom-table' rowClassName='custom-row' dataSource={rawData} columns={columns} pagination={false} />
        </section>
      </div>
  );
};

export default PreserveQMGTC;
