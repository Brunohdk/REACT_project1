import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from './escopo/escopo/Home'
import UserCrud from '../components/UserCrud'
import UserTodos from '../components/UserTodos'
import UserContas from '../components/UserContas'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/todos' component={UserTodos}/>
        <Route path='/contas' component={UserContas} />
        <Route path='/users' component={UserCrud}/>
    </Switch>
