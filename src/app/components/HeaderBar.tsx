// src/components/HeaderBar.tsx
import React from 'react';
import Link from 'next/link';

const HeaderBar = () => {
    return (
        <header className="h-16 bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-400">
            <div className="text-2xl font-bold">
                <Link href="/">
                    ECO-Cleanbot Dashboard
                </Link>
            </div>
        </header>
    );
};

export default HeaderBar;
