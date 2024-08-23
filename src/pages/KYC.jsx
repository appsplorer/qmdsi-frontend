import React from 'react';
import Nominee from '../components/Nominee';
import KycComponent from '../components/KycComponent';
import KYCForm from '../components/KycComponent';

const KYC = () => {
  
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <Nominee />
      <div className='hollow-text z-100 touch-none'>KYC</div>  
    </div>
  );
};

export default KYC;

