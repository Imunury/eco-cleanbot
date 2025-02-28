import { ecobot_status_temp } from '@prisma/client';
import { use, useEffect, useState } from "react";
import ModeManual from "./ModeManual";
import ModeCourse from "./ModeCourse";
import ModePosition from "./ModePosition";

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const ModeComponent: React.FC<RobotInfoProps> = ({ robotData }) => {

    const [currentData, setCurrentData] = useState(robotData);
    const [mode, setMode] = useState("");
    const [bg, setBg] = useState("");
    const [changedMode, setChangedMode] = useState("")

    useEffect(() => {
        // 로봇 데이터의 상태가 변경될 때마다 모드 업데이트
        switch (robotData.current_state) {
            case 0: setChangedMode("정지"); break;
            case 1: setChangedMode("수동"); break;
            case 2: setChangedMode("코스주행"); break;
            case 3: setChangedMode("위치사수"); break;
        }
    }, [robotData.current_state]);

    useEffect(() => {
        // 로봇 데이터의 상태가 변경될 때마다 모드 업데이트
        switch (robotData.current_state) {
            case 0: setMode("정지"), setBg("bg-red-400"); break;
            case 1: setMode("수동"), setBg("bg-purple-300"); break;
            case 2: setMode("코스주행"), setBg("bg-orange-400"); break;
            case 3: setMode("자동"), setBg("bg-cyan-400"); break;
        }
    }, []);

    const changeMode = async (newMode: string) => {

        switch (parseInt(newMode)) {
            case 0: setMode("정지"), setBg("bg-red-400"); break;
            case 1: setMode("수동"), setBg("bg-purple-300"); break;
            case 2: setMode("코스주행"), setBg("bg-orange-400"); break;
            case 3: setMode("자동"), setBg("bg-cyan-400"); break;
            default: setMode("");
        }

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: robotData.robot_id,
                    topics: [{ topic: "drv_mode", payload: newMode }]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);

            // 현재 상태를 업데이트하여 새 모드를 반영합니다.
            setCurrentData(prevData => ({ ...prevData, current_state: parseInt(newMode) }));
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className="h-full">
            <div className="h-1/6">
                <button className="bg-red-400" onClick={() => changeMode("00")}>정지</button>
                <button className="bg-purple-300" onClick={() => changeMode("01")}>수동</button>
                {/* <button className="bg-orange-400" onClick={() => changeMode("02")}>코스주행</button> */}
                <button className="bg-cyan-400" onClick={() => changeMode("03")}>자동</button>
                <span className="font-medium">실제 모드 : {changedMode}</span>
            </div>
            <div className={`text-center ${bg} h-5/6 transition-colors duration-400 ease-in-out rounded-lg`}>
                <h1>Panel Mode : {mode}</h1>
                {mode === "정지" && (
                    <div className='h-full'></div>
                )}
                {mode === "수동" && (
                    <ModeManual robotData={robotData} />
                )}
                {/* {mode === "코스주행" && (
                    <ModeCourse robotData={robotData} />
                )} */}
                {mode === "자동" && (
                    <ModePosition robotData={robotData} />
                )}
            </div>
        </div>
    )
}

export default ModeComponent