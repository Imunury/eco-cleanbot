"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ecobot_status_temp } from '@prisma/client';


import ONOFF from '../components/ONOFF'
import RobotInfo from '../components/RobotInfo'
import CCTV from '../components/CCTV'
import SolarCharge from '../components/SolarCharge';
import Pump from '../components/Pump';
import ModeComponent from '../components/ModeComponent';
import Vacuum from '../components/Vacuum';
import NaverMap from '@/app/components/NaverMap';
import TrackingMap2 from '@/app/tracking_map/components/TrackingMap2';

const Control: React.FC = () => {

    const params = useParams();
    const id = params?.id as string | undefined
    const [robotData, setRobotData] = useState<ecobot_status_temp | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/robot_status/${id}`);
                    const data = await response.json();
                    setRobotData(data[0]);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, [id]);

    if (!robotData) {
        return <p>Loading...</p>;
    }

    return (
        <section className='control'>

            <div className='h-28'>
                <div className='w-1/6 '>
                    <ONOFF robotData={robotData} />
                </div>
                <div className='w-1/6'>
                    <Vacuum robotData={robotData} />
                </div>
                <div className='w-4/6'>
                    <RobotInfo robotData={robotData} />
                </div>
            </div>

            <div className='h-28'>
                <div className='w-1/3'>
                    <Pump robotData={robotData} />
                </div>

                <div className='w-4/6'>
                    <SolarCharge robotData={robotData} />
                </div>
            </div>

            <div className='h-80'>
                <div className='w-1/3'>
                    <CCTV robotData={robotData} />
                </div>
                <div className='w-1/3'>
                    <ModeComponent robotData={robotData} />
                </div>
                <div className='w-1/3'>
                    {robotData && <TrackingMap2 robotData={robotData} />}
                </div>
            </div>

        </section>
    )
}

export default Control
