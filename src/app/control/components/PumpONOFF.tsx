"use client"

import ToggleSwitch from "@/app/components/ToggleSwitch";
import { ecobot_status_temp } from '@prisma/client';
import { useEffect, useState } from "react";

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const PumpONOFF: React.FC<RobotInfoProps> = ({ robotData }) => {

    const robotId = robotData.robot_id;
    const [pumpStatus, setPumpStatus] = useState([0, 0, 0, 0]);

    useEffect(() => {
        if (robotData.pump_values && robotData.pump_values.length > 0) {
            setPumpStatus([
                robotData.pump_values[0] !== 1 ? 0 : 1,
                robotData.pump_values[1] !== 1 ? 0 : 1,
                robotData.pump_values[2] !== 1 ? 0 : 1,
                robotData.pump_values[3] !== 1 ? 0 : 1
            ]);
        }
    }, [robotData.pump_values]);

    const clickSwitch = async (index: number) => {

        pumpStatus[index] = pumpStatus[index] ? 0 : 1;

        const pumpStatusBind = pumpStatus.join(',')

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: robotId,
                    topics: [
                        { topic: "pmp_ctrl", payload: pumpStatusBind }
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
        <div>
            <div>
                <h3>꺼짐</h3>
                {/* <h3>PUMP2</h3>
                <h3>PUMP3</h3>
                <h3>PUMP4</h3> */}
            </div>
            <div className=" w-full h-full justify-center items-center">
                <div className="bg-green-800 w-4/5 h-full">

                </div>
                
                {/* {pumpStatus.map((isOn, index) => (
                    <ToggleSwitch
                        key={index}
                        isOn={pumpStatus[index] === 1 ? true : false}
                        onChange={() => clickSwitch(index)}
                    />
                ))} */}
            </div>
        </div>
    )
}

export default PumpONOFF