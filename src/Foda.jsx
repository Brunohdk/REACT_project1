import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {HashRouter} from 'react-router-dom'

import Routes from './components/Routes'
import Logo from './components/escopo/escopo/Logo'
import Nav from './components/escopo/escopo/Nav'
import Footer from './components/escopo/escopo/Footer'

export default props =>
    <HashRouter basename={process.env.PUBLIC_URL}>
    <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
    </div>
    </HashRouter>
