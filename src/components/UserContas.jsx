import React, { Component } from 'react'
import Main from './escopo/escopo/Main'
import axios from 'axios'
import './escopo/escopo/Contas.css'


const headerProps = {
    icon: 'fa fa-dollar',
    title: ' Contas',
    subtitle: 'CHORA NO MEU CARTAO DE CREDITO BEBEEEEEE'
}

const baseUrl = 'http://localhost:3001/contas'
const initialState = {
    contas: { local: '', data: '', desc: '', price: '' },
    list: []
}

export default class UserContas extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    save(){
        const contas = this.state.contas
        const method = contas.id? 'put' : 'post'
        const url = contas.id? `${baseUrl}/${contas.id}` : baseUrl
        axios[method](url, contas).then(resp=>{
            const list = this.getUpdatedList(resp.data)
            this.setState({contas: initialState.contas, list})
        })
    }

    getUpdatedList(contas, add = true){
        const list = this.state.list.filter(u => u.id!== contas.id)
        if(add)list.unshift(contas)
        return list
    }

    remove(contas){
        axios.delete(`${baseUrl}/${contas.id}`).then(resp =>{
            const list = this.getUpdatedList(contas, false)
            this.setState({list})
        })
    }

    load(contas){
        this.setState({contas})
    }

    updateField(event){
        const contas = {...this.state.contas}
        contas[event.target.name] = event.target.value
        this.setState({contas})
    }

    soma(){
        
    }


    renderRegister() {
        return (
            <div className="form">
                <div className="form-group">
                    <div className="row">
                        <div className="col-8">
                            <label>Local:</label>
                            <input type="text" name="local" placeholder="Extra, McDonalds..."
                                className="form-control" onChange={e => this.updateField(e)}
                                value={this.state.contas.local}/>
                        </div>
                        <div className="col-4">
                            <label>Data:</label>
                            <input type="text" name="data" placeholder="23/07/19..."
                                className="form-control" onChange={e => this.updateField(e)}
                                value={this.state.contas.data}/>
                        </div>
                        <div className="col-8 mt-3">
                            <label>Descrição:</label>
                            <input type="text" name="desc" placeholder="Compra do mês, role..."
                            className="form-control" onChange={e => this.updateField(e)}
                            value={this.state.contas.desc}/>
                        </div>
                        <div className="col-4 mt-3">
                            <label>Valor:</label>
                            <input type="number" name="price" placeholder="R$..." 
                            className="form-control" onChange={e => this.updateField(e)}
                            value={this.state.contas.price}/>
                        </div>
                    </div>
                    <button className="btn btn-dark col-12 mt-2"
                    onClick={e => this.save(e)}>Salvar</button>
                </div>
            </div>
        )
    }

    renderProducts() {
        return (
            <div className=" table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-fixed text-center table-bordered ">
                <thead className="thead-dark">
                    <tr>
                        <th>Local</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.list.map(conta => {
                            return (
                                <tr key={conta.id}>
                                    <td>{conta.local}</td>
                                    <td>{conta.data}</td>
                                    <td>{conta.desc}</td>
                                    <td>R${conta.price}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"
                                        onClick={()=>this.load(conta)}>
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm ml-2"
                                        onClick={() => this.remove(conta)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <span>R${this.state.list.reduce((accum, {price})=>accum-price,'')} na conta</span>
                </tfoot>
            </table>
        </div>
        )
    }


    renderAll() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h2 className="font-weight-bold text-center">Cadastro</h2>
                        {this.renderRegister()}
                    </div>
                    <div className="col-8">
                        <h2 className="font-weight-bold text-center">Histórico</h2>
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderAll()}
            </Main>
        )
    }
}