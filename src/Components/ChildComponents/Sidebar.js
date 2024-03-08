import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const SideBar = () => {
    return (
        <div className='sideBar'>
            <div className='backButtonContainer'>
                <a href='/schema' style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Back</a>
                <a href='/' style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</a>
            </div>
            <div className='sideBarContaint'>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20%', marginLeft: '5%', height: '8%', justifyContent: 'space-between' }}>
                    <Link style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} to='/schema'>Schema</Link>
                    <Link style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} to='/controller'>Controller</Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar;