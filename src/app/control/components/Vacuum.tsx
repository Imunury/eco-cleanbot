"use client"

import React, { useEffect, useState } from 'react';
import { ecobot_status_temp } from '@prisma/client';
import ToggleSwitch from '@/app/components/ToggleSwitch';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const ONOFF: React.FC<RobotInfoProps> = ({ robotData }) => {
    const robotId = robotData.robot_id;
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (robotData.motor_values && robotData.motor_values.length > 0) {
            setIsOn(robotData.motor_values[0] !== 0);
        }
    }, [robotData.motor_values]);

    const clickSwitch = async (isOn: boolean) => {
        const mode = isOn ? '1' : '0';

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: robotId,
                    topics: [
                        {
                            topic: "cmd_plc",
                            payload: mode
                        },
                        {
                            topic: "mtr_ctrl",
                            payload: "stop"
                        }
                        , {
                            topic: "drv_mode",
                            payload: "00"
                        }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }

    };

    return (
        <div className='control_container'>
            <h1>Vacuum ON / OFF</h1>
            <div className="control_items">
                <ToggleSwitch isOn={isOn} onChange={clickSwitch} />
            </div>
        </div>
    );
};

export default ONOFF;