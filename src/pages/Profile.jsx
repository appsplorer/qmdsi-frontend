import React, { useState } from 'react'

const Profile = () => {
    const profileData = {
        fullName: 'John Doe',
        phoneNumber: '+1234567890',
        email: 'john.doe@example.com',
        country: 'United States',
        walletAddress: '0x1234...abcd',
        kycStatus: 'Pending',
        referralLink: 'https://example.com/referral?code=12345',
        referralSignUps: [
            { date: '2024-08-01', name: 'R*L C**S' },
            { date: '2024-08-02', name: 'A**N B***R' },
            { date: '2024-08-03', name: 'M*K T***Y' },
            // Add more referral sign-ups as needed
        ],
    };

    const handleCopyReferralLink = () => {
        navigator.clipboard.writeText(profileData.referralLink);
        alert('Referral link copied to clipboard!');
    };
    return (
        <div className='px-4 md:px-24 pt-4 h-full'>

            <div className='border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center'>
                <div className="w-full max-w-[1200px] bg-accent rounded-md p-8 text-white ">
                    <h1 className="text-2xl mb-6 text-center">View Profile</h1>
                    <div className="space-y-4 px-24">
                        <div className='flex justify-between'>
                            <div>
                                <p><strong>Full Name:</strong> {profileData.fullName}</p>
                            </div>
                            <div>
                                <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            
                        <div>
                            <p><strong>Country:</strong> {profileData.country}</p>
                        </div>
                        <div>
                            <p><strong>Email:</strong> {profileData.email}</p>
                        </div>

                        </div>
                        <div>
                            <p><strong>Wallet Address:</strong> {profileData.walletAddress}</p>
                        </div>
                        <div className="flex items-center">
                            <p><strong>KYC Status:</strong> {profileData.kycStatus}</p>
                            <button className="bg-primary ml-4 px-4 py-2 rounded text-dark">
                                Verify Identity
                            </button>
                        </div>
                        <div className="flex items-center">
                            <p><strong>Referral Link:</strong> {profileData.referralLink}</p>
                            <button
                                className="bg-primary ml-4 px-4 py-2 rounded text-dark"
                                onClick={handleCopyReferralLink}
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 px-24">
                        <h2 className="text-xl mb-4">Referral Sign-Ups</h2>
                        <ul className="space-y-2">
                            {profileData.referralSignUps.map((signup, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{signup.date}</span>
                                    <span>{signup.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='hollow-text z-100 touch-none'>PROFILE</div>
        </div>
    )
}

export default Profile
