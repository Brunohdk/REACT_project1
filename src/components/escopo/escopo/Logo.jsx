import React from 'react'
import './Logo.css'
import Logo from '../../assets/imgs/logo1.png'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={Logo} alt="logo"/>
            </Link>
    </aside>