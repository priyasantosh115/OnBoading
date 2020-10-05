import React, {Component} from 'react';
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react';

const initialState={
    open:false,
    name:'',
    address:'',
    nameError:'',
    addressError:''
}
export default class UpdateStoreModal extends Component{
    static displayName=UpdateStoreModal.name;
    constructor(props){
        super();
        this.state = initialState;
        this.handleUpdate=this.handleUpdate.bind(this);
        this.validateFunction=this.validateFunction.bind(this);
    };

    validateFunction() {
        let errorMessage="";
        let addressError="";
        let notError = true;
        
        if(!this.state.name){
            errorMessage="Store's Name is required";
            this.state.nameError = errorMessage;
            notError = false;
        }
        else
        {
            this.state.nameError = "";
        }
        if(!this.state.address){
            addressError="Store's Address is required";
            this.state.addressError = addressError;
            notError = false;
        }
        else
        {
            this.state.addressError = "";
        }
        if(errorMessage||addressError){
            this.setState({errorMessage,addressError});
            notError = false;
        }
        return notError;
    };

    showPopup = (e) => {
        this.setState({ open: !this.state.open });
        e.preventDefault();
        
        fetch('https://priyankaapp.azurewebsites.net/Store/GetById?id=' + this.props.state.id, {
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
    };

   

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.address]:e.target.value});
        this.validateFunction();
        this.forceUpdate();
    };

    handleUpdate(event){  
        event.preventDefault();
        const isValid =this.validateFunction();
        if (!isValid){
            console.log(this.state);
            this.forceUpdate();
        }else
        {
        const data={id:this.props.state.id,name:this.state.name,address:this.state.address}
        
        fetch('https://priyankaapp.azurewebsites.net/Store/Update',{
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
            this.setState(initialState);
    }
};

    render(){
        return(
            <Modal
            trigger={<Button icon labelPosition='left' color='yellow' onClick={this.showPopup}>
                <Icon name='edit'  />
                Edit</Button>}
                  open={this.state.open}
                  size='Tiny'
                  centered>

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
                          label='Store Name'
                          placeholder='Store Name'
                          defaultValue={this.state.name}
                          name='name'
                          onChange={this.onChange} 
                          required
                          error={this.state.nameError}
                          ></Form.Input> 
                          <Form.Input
                          fluid
                          label='Store Address'
                          placeholder='Store Address'
                          name='address'
                          defaultValue={this.state.address}
                          onChange={this.onChange} 
                          required
                          error={this.state.addressError}
                          ></Form.Input> 
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
