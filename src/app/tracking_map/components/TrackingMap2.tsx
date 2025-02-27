"use client";

import React, { useEffect, useRef } from "react";
import { ecobot_status_temp } from "@prisma/client";

interface TrackingMapProps {
    robotData: ecobot_status_temp;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ robotData }) => {
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!window.naver || !window.naver.maps || !mapContainerRef.current) return;

        // 맵이 아직 생성되지 않았다면 초기화
        if (!mapRef.current) {
            mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
                center: new window.naver.maps.LatLng(robotData.latitude, robotData.longitude),
                zoom: 18,
                mapTypeId: "satellite",
            });

            markerRef.current = new window.naver.maps.Circle({
                center: new window.naver.maps.LatLng(robotData.latitude, robotData.longitude),
                map: mapRef.current,
                radius: 2,
                fillColor: "#ffff00",
                fillOpacity: 0.6,
                strokeColor: "#ffff00",
                strokeWeight: 1,
            });
        } else {
            // 기존 맵이 존재하면 중심 좌표만 이동
            const newCenter = new window.naver.maps.LatLng(robotData.latitude, robotData.longitude);
            mapRef.current.setCenter(newCenter);

            if (markerRef.current) {
                markerRef.current.setCenter(newCenter);
            } else {
                markerRef.current = new window.naver.maps.Circle({
                    center: newCenter,
                    map: mapRef.current,
                    radius: 2,
                    fillColor: "#ffff00",
                    fillOpacity: 0.6,
                    strokeColor: "#ffff00",
                    strokeWeight: 1,
                });
            }
        }
    }, [robotData]);

    return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default TrackingMap;
