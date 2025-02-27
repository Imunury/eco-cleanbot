"use client"

import React, { useEffect, useState } from 'react';
import type { RobotAll } from '..';
import { useSearchParams } from 'next/navigation';


interface NaverMapProps {
    robotAll: RobotAll[];
}

const NaverMap: React.FC<NaverMapProps> = ({ robotAll }) => {
    const searchParams = useSearchParams() ?? new URLSearchParams();
    const selectedRobotId = searchParams.get('selectedRobot');

    useEffect(() => {
        const initializeMap = () => {
            if (window.naver && window.naver.maps) {
                const container = document.getElementById('map');
                const options = {
                    center: new window.naver.maps.LatLng(36.5325, 127.6120),
                    zoom: 8,
                    mapTypeId: 'satellite'
                };
                const map = new window.naver.maps.Map(container, options);

                robotAll.forEach(data => {

                    const robot_name = data.robot_id ? `eco-clean${data.robot_id.slice(6)}` : "error";


                    let robot_mode = "";
                    const current_state = data.current_state
                    switch (current_state) {
                        case 0: robot_mode = "정지"
                            break;
                        case 1: robot_mode = "정지"
                            break;
                        case 2: robot_mode = "코스주행"
                            break;
                        case 3: robot_mode = "위치사수"
                            break;
                    }

                    let textChl = 'textBlue'
                    if (data.chl_ug_l > 60) {
                        textChl = 'textRed'
                    } else if (data.chl_ug_l > 30) {
                        textChl = 'textOrange'
                    }

                    let textBg = 'textBlue'
                    if (data.bg_ppb > 60) {
                        textBg = 'textRed'
                    } else if (data.bg_ppb > 30) {
                        textBg = 'textOrange'
                    }

                    let textTurb = 'textBlue'
                    if (data.bg_ppb > 60) {
                        textTurb = 'textRed'
                    } else if (data.bg_ppb > 30) {
                        textTurb = 'textOrange'
                    }

                    let latitude = data.latitude
                    let longitude = data.longitude
                    let timestamp = data.timestamp
                    let formattedTimestamp = timestamp?.replace(/[T:.]/g, "").slice(0, -10) || "";

                    if (data.robot_id === 'ecobot00008' || data.robot_id === 'ecobot00012') {
                        latitude = data.latitude + 0.3
                    }

                    let marker1 = new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(latitude, longitude),
                        map: map,
                        icon: {
                            content: `<div class="markerInfo">
                                <p>${robot_name}</p>
                                <p><span>모드 : </span><span>${robot_mode}</span></p>
                                <p><span>청소량 : </span><span class="${textChl}">${data.chl_ug_l}</span></p>
                                <p><span>오수통량 : </span><span class="${textBg}">${data.bg_ppb}</span></p>
                                <p><span>필터량 : </span><span class="${textTurb}">${data.turb_ntu}</span></p>
                            </div>`
                        },
                    });

                    window.naver.maps.Event.addListener(map, 'zoom_changed', () => {
                        if (data.robot_id === 'ecobot00008' || data.robot_id === 'ecobot00012') {
                            marker1.setMap(null)
                            let zoomMulti = 1;
                            let zoom = (map.getZoom() - 5)
                            for (let i = 0; i < zoom; i++) {
                                zoomMulti = zoomMulti * 2
                            }
                            latitude = data.latitude + 2.4 / zoomMulti

                            marker1 = new window.naver.maps.Marker({
                                position: new window.naver.maps.LatLng(latitude, longitude),
                                map: map,
                                icon: {
                                    content: `<div class="markerInfo">
                                    <p>${robot_name}</p>
                                    <p><span>모드 : </span><span>${robot_mode}</span></p>
                                    <p><span>청소량 : </span><span class="${textChl}">${data.chl_ug_l}</span></p>
                                    <p><span>오수량 : </span><span class="${textBg}">${data.bg_ppb}</span></p>
                                    <p><span>필터량 : </span><span class="${textTurb}">${data.turb_ntu}</span></p>
                                </div>`
                                },
                            });
                        }

                    })


                    const marker2 = new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(data.latitude, data.longitude),
                        map: map,
                        icon: {
                            content: `
                              <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="green" stroke="yellowgreen" stroke-width="2" />
                              </svg>
                            `,
                            anchor: new window.naver.maps.Point(12, 12) // 마커 중심 위치 조정
                        }
                    });

                    // marker.addListener('click', () => {
                    //     setSelectedRobot(data);
                    // });
                });
            }
        };

        if (window.naver && window.naver.maps) {
            initializeMap();
        } else {
            const checkNaverMap = setInterval(() => {
                if (window.naver && window.naver.maps) {
                    clearInterval(checkNaverMap);
                    initializeMap();
                }
            }, 100);
        }
    }, [robotAll]);

    return (
        <div className="w-full h-full relative">
            <div id="map" className="w-full h-full"></div>
            {selectedRobotId && (
                <div className="w-1/3 h-1/4 top-0 right-0 bg-white p-0 z-100 absolute overflow-hidden">
                    <iframe
                        src={`https://ecobotdashboard1.co.kr/${selectedRobotId}/`}
                        className="w-full h-full border-none"
                        scrolling="no">
                    </iframe>
                </div>
            )}
        </div>

    );
};

export default NaverMap;
