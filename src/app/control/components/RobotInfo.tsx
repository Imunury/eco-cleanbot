import React from 'react';
import { ecobot_status_temp } from '@prisma/client';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const RobotInfo: React.FC<RobotInfoProps> = ({ robotData }) => {
    return (
        <div className='control_container'>
            <h1>Robot Status</h1>
            <div className='control_items'>
                <div>
                    <h2>청소량</h2>
                    <h3>{robotData.latitude.toFixed(6)}</h3>
                </div>
                <div>
                    <h2>오수통량</h2>
                    <h3>{robotData.longitude.toFixed(6)}</h3>
                </div>
                <div>
                    <h2>필터량</h2>
                    <h3>{robotData.bearing}</h3>
                </div>
                <div>
                    <h2>속도</h2>
                    <div className='flex'>
                        <h3 className='px-1'>{robotData.current_speeds[0]}</h3>
                        <h3 className='px-1'>{robotData.current_speeds[1]}</h3>
                        <h3 className='px-1'>{robotData.current_speeds[2]}</h3>
                        <h3 className='px-1'>{robotData.current_speeds[3]}</h3>
                    </div>
                </div>
                <div>
                    <h2>각속도</h2>
                    <h3>{robotData.current_angular_vel}</h3>
                </div>
                

            </div>
        </div>
    );
};

export default RobotInfo;
