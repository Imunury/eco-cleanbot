import React from 'react';
import { ecobot_status_temp } from '@prisma/client';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const SolarCharge: React.FC<RobotInfoProps> = ({ robotData }) => {
    return (
        <div className='control_container'>
            <h1>Battery Charge</h1>
            <div className="control_items">
                <div>
                    <h2>충전량</h2>
                    <h3>{robotData.ctr_bat_soc}%</h3>
                </div>
                {/* <div>
                    <h2>태양광 전압</h2>
                    <h3>{robotData.ctr_pv_v}V</h3>
                </div>
                <div>
                    <h2>태양광 전류</h2>
                    <h3>{robotData.ctr_pv_c}A</h3>
                </div>
                <div>
                    <h2>배터리 온도</h2>
                    <h3>{robotData.ctr_bat_temp}°C</h3>
                </div>
                <div>
                    <h2>장치 온도</h2>
                    <h3>{robotData.ctr_device_temp}°C</h3>
                </div> */}
            </div>
        </div>
    )
}

export default SolarCharge