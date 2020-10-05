import React, {Component} from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

const initialState={
    open:false,
    name:'',
    address:'',
    nameError:'',
    addressError:''
}
export default class CreateStoreModal extends Component{
    constructor(props){
        super();
        this.state=initialState;
        this.handleCreate=this.handleCreate.bind(this);
        this.validateFunction=this.validateFunction.bind(this);
    }

    showPopup = () => {
      this.setState({ open: !this.state.open });
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

    handleCreate(event){
        event.preventDefault();
      
        const isValid =this.validateFunction();
        if (!isValid){
            console.log(this.state);
            this.forceUpdate();
        }else
        {
            const data={name:this.state.name,address:this.state.address}
            fetch('https://priyankaapp.azurewebsites.net/Store/Create',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            })
            .then(res=>res.json())
            .catch(error=>console.error('Error:',error))
            .then(result=> {
                    this.props.getDataCreate();
                    window.location.reload();
                }
            )
            this.setState(initialState);
        }
  };

  onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
      this.setState({[e.target.address]:e.target.value});
      this.validateFunction();
      this.forceUpdate();
  }
    render(){ 
        return(
        <Modal trigger={<Button primary onClick={this.showPopup}>New Store</Button>}
            open={this.state.open}
            size='Tiny'
            centered>
            
            <Header>
              Create Store
            </Header>
            <Modal.Content>
            <Form  onSubmit={this.handleCreate} >
                <Form.Input><div className="form-group row"
                  id='id'
                  type="hidden" value='{this.state.id}'/></Form.Input>
                    <Form.Input
                        fluid
                        label='Store Name'
                        placeholder='Store Name'
                        name='name'
                        onChange={this.onChange} 
                        required
                        error={this.state.nameError}>
                    </Form.Input> 
                    <Form.Input
                        fluid
                        label='Store Address'
                        placeholder='Store Address'
                        name='address'
                        onChange={this.onChange} 
                        required
                        error={this.state.addressError}>
                    </Form.Input>
                </Form>
            </Modal.Content>
            <Modal.Actions>
              <div className="form-group row">
                    <Button color='green' onClick={this.handleCreate}><Icon name='checkmark' />Create</Button>
                    <Button color='black' onClick={this.showPopup}>Cancel</Button>
                </div>
            </Modal.Actions>            
          </Modal>
        )
    };
}
   


