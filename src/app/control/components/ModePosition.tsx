import { ecobot_status_temp } from '@prisma/client';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const ModePosition: React.FC<RobotInfoProps> = ({ robotData }) => {

    const robotId = robotData.robot_id;

    const holdingMinVelocity = robotData.holding_min_velocity !== null ? robotData.holding_min_velocity * 100 : 'N/A';
    const holdingMinAngVelocity = robotData.holding_min_ang_velocity !== null ? robotData.holding_min_ang_velocity * 100 : 'N/A';

    const clickPosition = async (position: string) => {

        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: robotId, topics: [{ topic: "param", payload: `holding_goal_distance_threshold=${position}` }] }),
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
            {/* <div className="flex justify-evenly w-1/2">
                <div>
                    <h2>속도</h2>
                    <h3>{holdingMinVelocity}</h3>
                </div>
                <div>
                    <h2>회전속도</h2>
                    <h3>{holdingMinAngVelocity}</h3>
                </div>
                <div>
                    <h2>반경</h2>
                    <h3>{robotData.holding_goal_distance_threshold}m</h3>
                </div>
            </div>
            <div className="w-1/2">
                <h2>반경제어</h2>
                <button onClick={() => clickPosition("3.0")}>3m</button>
                <button onClick={() => clickPosition("5.0")}>5m</button>
                <button onClick={() => clickPosition("8.0")}>8m</button>
                <button onClick={() => clickPosition("10.0")}>10m</button>
            </div> */}
        </div>
    )
}

export default ModePosition