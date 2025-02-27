import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import prisma_jincheon1 from '../../lib/prisma_jincheon1'
import prisma_jincheon2 from '../../lib/prisma_jincheon2'

export interface RobotAll {
    robot_id: string;
    timestamp: string;
    chl_ug_l: number;
    bg_ppb: number;
    turb_ntu: number;
    latitude: number;
    longitude: number;
    current_state: number;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const ecobotAll = await prisma.$queryRaw<RobotAll[]>`
                SELECT 
                    es.robot_id,
                    es.timestamp as timestamp,
                    COALESCE(wq.chl_ug_l, '9999') AS chl_ug_l,  -- 기본값 0
                    COALESCE(wq.bg_ppb, '9999') AS bg_ppb,      -- 기본값 0
                    COALESCE(wq.turb_ntu, '9999') AS turb_ntu,      -- 기본값 0
                    es.latitude,
                    es.longitude,
                    es.current_state
                FROM 
                    (SELECT * 
                    FROM water_quality_temp
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM water_quality_temp
                        GROUP BY robot_id
                    )) AS wq
                FULL OUTER JOIN 
                    (SELECT * 
                    FROM ecobot_status
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM ecobot_status
                        GROUP BY robot_id
                    )) AS es
                ON 
                    wq.robot_id = es.robot_id
                ORDER BY 
                    wq.robot_id;
            `;

            const jincheon1 = await prisma_jincheon1.$queryRaw<RobotAll[]>`
                SELECT 
                    es.robot_id,
                    es.timestamp as timestamp,
                    COALESCE(wq.chl_ug_l, '9999') AS chl_ug_l,  -- 기본값 0
                    COALESCE(wq.bg_ppb, '9999') AS bg_ppb,      -- 기본값 0
                    COALESCE(wq.turb_ntu, '9999') AS turb_ntu,      -- 기본값 0
                    es.latitude,
                    es.longitude,
                    es.current_state
                FROM 
                    (SELECT * 
                    FROM water_quality_temp
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM water_quality_temp
                        GROUP BY robot_id
                    )) AS wq
                FULL OUTER JOIN 
                    (SELECT * 
                    FROM ecobot_status
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM ecobot_status
                        GROUP BY robot_id
                    )) AS es
                ON 
                    wq.robot_id = es.robot_id
                ORDER BY 
                    wq.robot_id;
            `;

            const jincheon2 = await prisma_jincheon2.$queryRaw<RobotAll[]>`
                SELECT 
                    es.robot_id,
                    es.timestamp as timestamp,
                    COALESCE(wq.chl_ug_l, '9999') AS chl_ug_l,  -- 기본값 0
                    COALESCE(wq.bg_ppb, '9999') AS bg_ppb,      -- 기본값 0
                    COALESCE(wq.turb_ntu, '9999') AS turb_ntu,      -- 기본값 0
                    es.latitude,
                    es.longitude,
                    es.current_state
                FROM 
                    (SELECT * 
                    FROM water_quality_temp
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM water_quality_temp
                        GROUP BY robot_id
                    )) AS wq
                FULL OUTER JOIN 
                    (SELECT * 
                    FROM ecobot_status_temp
                    WHERE (robot_id, timestamp) IN (
                        SELECT robot_id, MAX(timestamp)
                        FROM ecobot_status_temp
                        GROUP BY robot_id
                    )) AS es
                ON 
                    wq.robot_id = es.robot_id
                ORDER BY 
                    wq.robot_id;
            `;

            const combineData = [...ecobotAll, ...jincheon1, ...jincheon2]
            res.status(200).json(combineData);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch ecobot status' });
        } finally {
            await prisma.$disconnect(); // 연결 해제
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
