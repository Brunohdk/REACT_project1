import React, { Component } from 'react'
import Main from './escopo/escopo/Main'
import axios from 'axios'


const baseUrl = 'http://localhost:3001/todos'
const headerProps = {
    icon: 'exclamation-circle',
    title: ' NÃO ESQUECER',
    subtitle: 'zé buceta'
}

const initialState = {
    todos: { content: '' },
    list: []
}

export default class App extends Component {
    state = { ...initialState }

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    remove(todos) {
        axios.delete(`${baseUrl}/${todos.id}`).then(resp => {
            const list = this.getUpdatedList(todos, false)
            this.setState({ list })
        })
    }

    load(todos) {
        this.setState({ todos })
    }

    getUpdatedList(todos, add = true) {
        const list = this.state.list.filter(u => u.id !== todos.id)
        if (add) list.unshift(todos)
        return list
    }

    updateField(event) {
        const todos = { ...this.state.todos }
        todos[event.target.name] = event.target.value
        this.setState({ todos })
    }


    save() {
        const todos = this.state.todos
        const method = todos.id ? 'put' : 'post'
        const url = todos.id ? `${baseUrl}/${todos.id}` : baseUrl
        axios[method](url, todos).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ todos: initialState.todos, list })
        })
    }



    renderAdd() {
        return (
            <div className="form-group container">
                <div className="row">
                    <div className="col-6">
                        <form>
                            <label className="mt-4 font-weight-bold">Adicionar Tarefa:</label>
                            <input type="text" className="form-control"
                                placeholder="O que você lembrou de fazer?..."
                                name="content"
                                value={this.state.todos.content}
                                onChange={(e) => this.updateField(e)}
                            />
                        </form>
                    </div>
                    <div className="col-2 mt-5 ">
                            <button className="btn btn-primary mt-2"
                                onClick={e => this.save(e)}>
                                Salvar
                        </button>
                        </div>
                </div>
            </div>
        )
    }

    renderTodos() {
      return (
          <div className="container">
            <h1 className="font-weight-bold">To Do's</h1>
         <table className="table mt-4 text-center table-bordered">
            <thead className="thead-dark">
                 <tr>
                   <th>ID</th>
                   <th>TO DO</th>  
                   <th>AÇÕES</th>
                 </tr> 
            </thead>
         <tbody>
             {this.renderRows()}
         </tbody>
        </table>
        {this.renderAdd()}
        </div>
        )}
    
    renderRows(){
        return this.state.list.map(todo=>{
            return(
                <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.content}</td>
        <td>
                <button className="btn btn-warning" onClick={()=>this.load(todo)}>
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="btn btn-danger ml-2" onClick={()=>this.remove(todo)}>
                         <i className="fa fa-trash"></i>
            </button>
            </td>
        </tr>
            )
        })
    }

render() {
    return(
        <Main {...headerProps}>
            {this.renderTodos()}
        </Main>
    );
}
}