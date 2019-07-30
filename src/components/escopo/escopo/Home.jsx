import React from 'react'
import Main from './Main'

const headerProps = {
    icon: 'home',
    title: ' Início',
    subtitle: 'Navegue por aí'
}

export default props =>

    <Main {...headerProps}>
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="mb-0">EM CONSTRUÇÃO!!!!!!!!!!!!</p>
    </Main>