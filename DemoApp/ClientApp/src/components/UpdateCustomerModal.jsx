import React, {Component} from 'react';
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react';

export default class UpdateCustomerModal extends Component{
    static displayName=UpdateCustomerModal.name;
    constructor(props){
        super();
        this.state = {
            Name: '',
            Address: ''
        };
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    };

    showPopup = (e) => {
        this.setState({ open: !this.state.open });
        debugger;
        e.preventDefault();
        
        fetch('https://priyankaapp.azurewebsites.net/Customer/GetById?id=' + this.props.state.id, {
            headers : { 
            method:'GET',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({ name: response.name, address: response.address })
        });
    }

   

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.address]:e.target.value});
    }  

    handleUpdate(event){  
        event.preventDefault();
        const data={id:this.props.state.id,name:this.state.name,address:this.state.address}
        
        fetch('https://priyankaapp.azurewebsites.net/Customer/Update',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .catch(error=>console.error('Error:',error))
        .then(response=>
            {
                this.props.getDataUpdate();
                window.location.reload();
            });
    }

    handleCancel(e){
        e.preventDefault();
        this.props.history.push('/customer');
    }

    render(){
        return(
            <Modal
            trigger={<Button icon labelPosition='left' color='yellow' onClick={this.showPopup}>
                <Icon name='edit'  />
                Edit</Button>}
                  open={this.state.open}
                  size='small'
                  centered
                >
                  <Header>
                    Update Customer
                  </Header>
                  <Modal.Content>
                  <Form  onSubmit={this.handleUpdate} >
                  <Form.Input className="form-group row"
                        id='id'
                        type="hidden" value='{this.state.id}'></Form.Input>
                          <Form.Input
                          fluid
                          label='Name'
                          labelPosition='left corner'
                          placeholder='Your Name'
                          defaultValue={this.state.name}
                          name='name'
                          onChange={this.onChange} required
                          />
                          <Form.Input
                          fluid
                          label='Address'
                          placeholder='Your Address'
                          name='address'
                          defaultValue={this.state.address}
                          onChange={this.onChange} required
                          />
                    </Form>
                  <Modal.Actions>
                    <div className="form-group row">
                          <Button color='green' onClick={this.handleUpdate}><Icon name='checkmark' />Edit</Button>
                          <Button color='black' onClick={this.showPopup}>Cancel</Button>
                      </div>
                  </Modal.Actions>
                  </Modal.Content>
                </Modal>

            
        )  
    }
}  
