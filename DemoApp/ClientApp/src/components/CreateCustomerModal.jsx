
import React, {Component} from 'react';
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react';

const initialState={
    open:false,
    name:'',
    address:'',
    nameError:'',
    addressError:''
}
export default class CreateCustomerModal extends Component{
    constructor(props){
        super();
        this.state=initialState;
        this.handleCreate=this.handleCreate.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.validateFunction=this.validateFunction.bind(this);
    }

    showPopup = () => {
      this.setState({ open: !this.state.open });
    };

    validateFunction=()=>{
        let nameError="";
        let addressError="";
        
        if(!this.state.name){
            nameError="Customer's Name is required"
        }
        if(nameError){
            this.setState({nameError:nameError});
            return false;
        }
        if(!this.state.address){
            addressError="Customer's Address is required"
        }
        if(addressError){
            this.setState({addressError});
            return false;
        }
        if(nameError||addressError){
            this.setState({nameError,addressError});
            return false;
        }
        return true;
    };

    handleCreate(event){
        debugger
      event.preventDefault();
      
      const isValid =this.validateFunction();
      if (!isValid){
          console.log(this.state);
          this.setState(initialState);
      }else
      {
        const data={name:this.state.name,address:this.state.address}
            fetch('https://priyankaapp.azurewebsites.net/Customer/Create',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            })
            .then(res=>res.json())
            .catch(error=>console.error('Error:',error))
            .then(result=>
                {
                    this.props.getDataCreate();
                    window.location.reload();
                }
                )
        }
  };

  onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
      this.setState({[e.target.address]:e.target.value});
  }

  handleCancel(e){
      e.preventDefault();
      this.props.history.push('/customer');
  }

    render(){ 
        return(
        <Modal
      trigger={<Button primary onClick={this.showPopup}>New Customer</Button>}
            open={this.state.open}
            size='small'
            centered>
            <Header>
              Create Customer
            </Header>
            <Modal.Content>
            <Form  onSubmit={this.handleCreate} >
           <Form.Input><div className="form-group row"
                  id='id'
                  type="hidden" value='{this.state.id}'/></Form.Input>
                    <Form.Input
                    fluid
                    label='Name'
                    labelPosition='left corner'
                    placeholder='Your Name'
                    name='name'
                    onChange={this.onChange} 
                    required
                    errorText={this.state.nameError}>
                    
                    </Form.Input>
                    <Form.Input
                    fluid
                    label='Address'
                    placeholder='Your Address'
                    name='address'
                    onChange={this.onChange} 
                    required
                    errorText={this.state.addressError}
                    ></Form.Input>
                </Form>
            <Modal.Actions>
              <div className="form-group row">
                    <Button color='green' onClick={this.handleCreate}><Icon name='checkmark' />Create</Button>
                    <Button color='black' onClick={this.showPopup}>Cancel</Button>
                </div>
            </Modal.Actions>
            </Modal.Content>
          </Modal>
        )
    };
}
   


