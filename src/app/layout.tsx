'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import Sidebar from './components/Sidebar';
import RobotList from './components/RobotList';
import HeaderBar from './components/HeaderBar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className="light">
      <body className='h-screen w-screen overflow-hidden flex'>
        <Sidebar />
        <div className="w-full h-full">
          <HeaderBar />
          <div className='w-full h-full flex'>
            <RobotList/>
            <main className='w-5/6 h-full overflow-x-hidden bg-gray-900 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-200'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
