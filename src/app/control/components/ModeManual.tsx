import { ecobot_status_temp } from '@prisma/client';

interface RobotInfoProps {
    robotData: ecobot_status_temp;
}

const ModeManual: React.FC<RobotInfoProps> = ({ robotData }) => {

    const robotId = robotData.robot_id;

    const clickControl = async (payload: string) => {
        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: robotId, topics: [{ topic: "mtr_ctrl", payload: payload }] }),
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

    const clickSpeed = async (payload: string) => {
        try {
            const response = await fetch('/api/send-mqtt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: robotId, topics: [{ topic: "set_twist", payload: payload }] }),
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
            <div>
                <h2>수동조작</h2>
                <div>
                    <button onClick={() => clickControl("left_turn")}> 좌회전</button>
                    <button onClick={() => clickControl("forward")}>전진</button>
                    <button onClick={() => clickControl("right_turn")}>우회전</button>
                </div>
                <div>
                    <button onClick={() => clickControl("left_shift")}>좌이동</button>
                    <button onClick={() => clickControl("stop")}>정지</button>
                    <button onClick={() => clickControl("right_shift")}>우이동</button>
                </div>
                <div>
                    <button onClick={() => clickControl("left_turn")}>좌회전</button>
                    <button onClick={() => clickControl("backward")}>후진</button>
                    <button onClick={() => clickControl("right_turn")}>우회전</button>
                </div>
            </div>
            {/* <div>
                <h2>속도</h2>
                <h3>{robotData.current_speeds[0]}</h3>
                <h2>회전속도</h2>
                <h3>{robotData.current_speeds[3]}</h3>
            </div> */}
            {/* <div>
                <h2>속도제어</h2>
                <button onClick={() => clickSpeed("0.15,-0.15,0.15,0.12")}>1단</button>
                <button onClick={() => clickSpeed("0.3,-0.3,0.3,0.2")}>2단</button>
                <button onClick={() => clickSpeed("0.5,-0.5,0.45,0.40")}>3단</button>
                <button onClick={() => clickSpeed("0.65,-0.65,0.6,0.45")}>4단</button>
            </div> */}
        </div>
    )
}

export default ModeManual