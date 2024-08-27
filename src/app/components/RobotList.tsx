'use client'

import { ecobot_status_temp } from '@prisma/client';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RobotList: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname() || '';

    const params = useParams();
    const id = params?.id as string | undefined

    const [robotList, setRobotList] = useState<ecobot_status_temp[]>([]);
    const [selectedRobotId, setSelectedRobotId] = useState<string | undefined>(id);

    useEffect(() => {

        setSelectedRobotId(id)

        const fetchData = async () => {
            try {
                const response = await fetch('/api/ecobot_list');
                const data = await response.json();
                setRobotList(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [params]);

    const handleRobotClick = (robotId: string) => {
        setSelectedRobotId(robotId);
        if (pathname.startsWith('/control')) {
            router.push(`/control/${robotId}`);
        } else if (pathname.startsWith('/tracking_map')) {
            router.push(`/tracking_map/${robotId}`);
        } else if (pathname.startsWith('/cctv')) {
            router.push(`/cctv/${robotId}`);
        }
    };

    return (
        <section className='w-1/6 overflow-y-auto bg-emerald-50'>
            {robotList.length > 0 ? (
                <ul>
                    {robotList.map((data, index) => {
                        const firstValue = data.motor_values && data.motor_values.length > 0 ? data.motor_values[0] : null;
                        const isMotorOn = firstValue === 1;

                        return (
                            <li
                                key={data.robot_id}
                                onClick={() => handleRobotClick(data.robot_id)}
                                className={`p-3 cursor-pointer border-solid border-slate-500 border-b transition-colors duration-500 ${selectedRobotId === data.robot_id ? 'bg-emerald-200' : ''}`}>
                                <p>로봇 아이디 : {data.robot_id}</p>
                                <p>ON / OFF : {firstValue !== null ? (isMotorOn ? "ON" : "OFF") : "NO DATA"}</p>
                                <p>배터리(%) : {data.ctr_bat_soc !== null ? data.ctr_bat_soc : "NO DATA"}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default RobotList;
