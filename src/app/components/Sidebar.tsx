// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <nav className="w-1/6 bg-emerald-600 text-white flex flex-col">
            <nav className="sidebar">
                <h1 className=''>ECOBOT Dashboard</h1>
                <Link href="/">
                    <h2 className=''>🟡 Robot Map</h2>
                </Link>
                <Link href="/tracking_map/ecobot00005">
                    <h2 className=''>🟤 Tracking Map</h2>
                </Link>
                <Link href="/control/ecobot00005">
                    <h2 className=''>🔴 Robot Control</h2>
                </Link>
                <Link href="/cctv">
                    <h2 className=''>🟣 CCTV</h2>
                </Link>
                <Link href="/water_quality">
                    <h2 className=''>🟠 Water Quality</h2>
                </Link>
                {/* <Link href="/han/ecobot00005">
                    <h2 className=''>🟢 Weather</h2>
                </Link> */}
                {/* <Link href="/waterlevel/ecobot00005">
                    <h2 className=''>🔵 WaterLevel</h2>
                </Link> */}
            </nav>
        </nav>
    );
};

export default Sidebar;
