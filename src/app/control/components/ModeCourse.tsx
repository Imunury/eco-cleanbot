import { ecobot_status_temp } from '@prisma/client';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const ModeCourse: React.FC<RobotInfoProps> = ({ robotData }) => {

    const robotId = robotData.robot_id

    const courseMinVelocity = robotData.course_min_velocity !== null ? robotData.course_min_velocity * 100 : 'N/A';
    const courseMinAngVelocity = robotData.course_min_ang_velocity !== null ? robotData.course_min_ang_velocity * 100 : 'N/A';

    const clickSpeed = async (speed: string, hold: string) => {

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: robotId, topics: [{ topic: "param", payload: `course_min_velocity=${speed},holding_min_velocity=${hold}` }] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }

    }

    const clickRotate = async (rotate: string, hold: string) => {

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: robotId, topics: [{ topic: "param", payload: `course_min_ang_velocity=${rotate},holding_min_ang_velocity=${hold}` }] }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return (
        <div className="flex justify-evenly h-full items-center ">
            <div className="flex justify-evenly w-1/2">
                <div>
                    <h2>속도</h2>
                    <h3>{courseMinVelocity}</h3>
                </div>
                <div>
                    <h2>회전속도</h2>
                    <h3>{courseMinAngVelocity}</h3>
                </div>
                <div>
                    <h2>반경</h2>
                    <h3>{robotData.course_goal_distance_threshold}m</h3>
                </div>
            </div>
            {/* <div className="flex flex-col w-1/2">
                <div>
                    <h2>코스 속도 제어</h2>
                    <button onClick={() => clickSpeed("0.25", "0.20")}>1단</button>
                    <button onClick={() => clickSpeed("0.30", "0.25")}>2단</button>
                    <button onClick={() => clickSpeed("0.35", "0.30")}>3단</button>
                    <button onClick={() => clickSpeed("0.45", "0.35")}>4단</button>
                </div>
                <div>
                    <h2>코스 회전 제어</h2>
                    <button onClick={() => clickRotate("0.08", "0.05")}>1단</button>
                    <button onClick={() => clickRotate("0.12", "0.09")}>2단</button>
                    <button onClick={() => clickRotate("0.15", "0.12")}>3단</button>
                    <button onClick={() => clickRotate("0.20", "0.15")}>4단</button>
                </div>
            </div> */}
        </div>
    )
}

export default ModeCourse