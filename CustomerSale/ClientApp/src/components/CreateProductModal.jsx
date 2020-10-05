import React, {Component} from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

const initialState={
    open:false,
    name:'',
    price:'',
    nameError:'',
    priceError:''
}
export default class CreateProductModal extends Component{
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
        let priceError="";
        let notError = true;
        
        if(!this.state.name){
            errorMessage="Product's Name is required";
            this.state.nameError = errorMessage;
            notError = false;
        }
        else
        {
            this.state.nameError = "";
        }
        if(!this.state.price){
            priceError="Product's Price is required";
            this.state.priceError = priceError;
            notError = false;
        }
        else
        {
            this.state.priceError = "";
        }
        if(errorMessage||priceError){
            this.setState({errorMessage,priceError});
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
            fetch('https://priyankaapp.azurewebsites.net/Product/Create',{
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
      this.setState({[e.target.price]:e.target.value});
      this.validateFunction();
      this.forceUpdate();
  }
    render(){ 
        return(
        <Modal trigger={<Button primary onClick={this.showPopup}>New Product</Button>}
            open={this.state.open}
            size='Tiny'
            centered>
            
            <Header>
              Create Product
            </Header>
            <Modal.Content>
            <Form  onSubmit={this.handleCreate} >
                <Form.Input><div className="form-group row"
                  id='id'
                  type="hidden" value='{this.state.id}'/></Form.Input>
                    <Form.Input
                        fluid
                        label='Name'
                        placeholder='Product Name'
                        name='name'
                        onChange={this.onChange} 
                        required
                        error={this.state.nameError}>
                    </Form.Input> 
                    <Form.Input
                        fluid
                        label='Price'
                        placeholder='Product Price'
                        name='price'
                        onChange={this.onChange} 
                        required
                        error={this.state.priceError}>
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
   


