import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import { useToggle } from '../../hooks/useToggle';
import './wrapper.css';

export default function Wrapper() {
    const [sidebarOpen, toggleSidebarOpen] = useToggle(false);

    return (
        <div className='layout'>
            <Sidebar isOpen={sidebarOpen} />
            <div className="wrapper" >
                <Navbar isOpen={sidebarOpen} toggleIsOpen={toggleSidebarOpen} />
                <Main />
            </div>
        </div>
    )
}
