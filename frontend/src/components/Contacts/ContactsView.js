import React, { Component } from 'react';
import  ContactsHelpers  from '../../helpers/Contacts/ContactsHelpers';


class ContactsView extends Component {

        constructor() {
            super();
            this.state ={
                contact_id:null, 
                contact_name:"", 
                contact_phone:"",
                items: [],
            };
            this.handleChangeContact_id = this.handleChangeContact_id.bind(this);
            this.handleChangeContact_name = this.handleChangeContact_name.bind(this);
            this.handleContact_phone = this.handleContact_phone.bind(this);
            this.saveContact = this.saveContact.bind(this);
            this.loadContacts = this.loadContacts.bind(this);
            this.editContact = this.editContact.bind(this);
        }
        componentDidMount() {
            this.loadContacts();
        }
        handleChangeContact_id(event) {
            this.setState({contact_id: event.target.value});
        }
        handleChangeContact_name(event) {
            this.setState({contact_name: event.target.value});
        }
        handleContact_phone(event) {
            this.setState({contact_phone: event.target.value});
        }
        saveContact(event) {
            event.preventDefault();
            if(
                this.state.contact_id!=null
                &&
                this.state.contact_id.length!=0
            ){
                ContactsHelpers.update(
                    this.state.contact_id,
                    this.state.contact_name,
                    this.state.contact_phone,
                ).then(res => {
                    console.log(res.data);
                }).catch(function (error) {
                    
                    console.log(JSON.stringify(error))
                });
            }
            else{
                ContactsHelpers.create(
                    this.state.contact_name,
                    this.state.contact_phone,
                ).then(res => {
                    console.log(res.data);
                }).catch(function (error) {
                    
                    console.log(JSON.stringify(error))
                });
            }
            this.loadContacts();
        }   
        loadContacts() {
            ContactsHelpers.all().then(res => {
                console.log(res.data);
                this.setState({ items: res.data });
            }).catch(function (error) {
    
                console.log(JSON.stringify(error))
            });
            this.forceUpdate();
        }
        editContact(id,event) {
           ContactsHelpers.get(id).then(res => {
                console.log(res.data);
                this.setState({ contact_id: res.data.id });
                this.setState({ contact_name: res.data.name });
                this.setState({ contact_phone: res.data.phone });
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
        }
        deleteContact(id,event) {
            ContactsHelpers.delete(id).then(res => {
                console.log(res.data);
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
            this.loadContacts();
        }
        render() {
            let rows = [];
            this.state.items.forEach(element => {
                rows.push(
                    <tr class="w-100">
                        <th scope="row" style={{ "min-width": "50px"}}>{element.id}</th>
                        <td style={{ "width": "100%"}}>{element.name}</td>
                        <td style={{ "min-width": "150px"}}>{element.phone}</td>
                        <td style={{ "min-width": "170px"}} >
                            <button type="submit" class="btn btn-primary me-2" onClick={(e) => this.editContact(element.id,e)}>Editar</button>                
                            <button type="submit" class="btn btn-danger ms-2" onClick={(e) => this.deleteContact(element.id,e)}>Excluir</button>                
                        </td>
                    </tr>
                );
                
            });
            return (
                <>
                    <div class="h-100- w-100 d-flex flex-wrap justify-content-start  align-items-center bg-dark" style = {{height:"100vh"}}>
                        <div class="d-flex flex-wrap align-self-center col-md-6 mx-auto px-4 pb-3 pt-2 bg-light text-secondary">
                            <h1>Agenda telefônica</h1>
                            <form class="w-100" onSubmit={this.saveContact}>
                                <div class="form-group w-100">
                                    <label for="exampleInputnome1">Nome</label>
                                    <input type="text" class="form-control" placeholder="Digite o nome do contato" value={this.state.contact_name} onChange={this.handleChangeContact_name}/>
                                    <small id="nameHelp" class="form-text text-muted px-3">O nome deve conter mais de 4 caracteres</small>
                                </div>
                                <div class="form-group w-100 pt-1">
                                    <label for="exampleInputnome1">Telefone</label>
                                    <input type="text" class="form-control" placeholder="(__)_____-_____" mask="(99)99999-9999"value={this.state.contact_phone} onChange={this.handleContact_phone}/>
                                    <small id="phoneHelp" class="form-text text-muted px-3">O telefone é um campo obrigatório</small>
                                </div>
                                <div class="form-group w-100 pt-2">
                                    <button type="submit" class="btn btn-success">Salvar</button>                
                                </div>
                            </form>
                            <hr class="w-100 "/>
                            <table class="table table-striped w-100 ">
                                <thead class="thead-dark w-100 d-flex" >
                                    <tr class="w-100 ">
                                        <th scope="col" style={{ "min-width": "50px"}}>#</th>
                                        <th scope="col " style={{ "width": "100%"}}>Nome</th>
                                        <th scope="col" style={{ "min-width": "150px"}} >Telefone</th>
                                        <th scope="col" style={{ "min-width": "170px"}} >Acões</th>
                                    </tr>
                                </thead>
                                <tbody class="w-100 d-flex flex-wrap " style={{ "min-height":"250px",height:"200px","min-width":"100%","overflow-y":"scroll"}}>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>

            )
        }
  }
  
  export default ContactsView