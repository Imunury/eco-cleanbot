"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
    const pathname = usePathname(); // 현재 URL 가져오기

    return (
        <nav className="w-1/12 bg-gray-800 text-white flex flex-col">
            <nav className="sidebar">
                {[
                    { href: "/", label: "Map" },
                    { href: "/tracking_map/ecobot00005", label: "Tracking" },
                    { href: "/control/ecobot00005", label: "Control" },
                    { href: "/cctv", label: "CCTV" },
                    { href: "/water_quality", label: "Cleaning" },
                ].map(({ href, label }) => {
                    const isActive = pathname === href; // 현재 경로와 비교
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`transition-colors duration-300 rounded-md mx-2 ${
                                isActive ? "bg-gray-600 text-yellow-400" : "hover:bg-gray-700"
                            }`}
                        >
                            <h3 className="my-2 mx-2">{label}</h3>
                        </Link>
                    );
                })}
            </nav>
        </nav>
    );
};

export default Sidebar;
