import  React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
           </Link>
           <Link to="/todos">
                <i className="fa fa-exclamation-circle"></i> To do
           </Link>
           <Link to= "/contas">
               <i className="fa fa-dollar"></i> Contas
            </Link>       
            <Link to="/users">
               <i className="fa fa-users"></i> Usuários
           </Link>
        </nav>
    </aside>



