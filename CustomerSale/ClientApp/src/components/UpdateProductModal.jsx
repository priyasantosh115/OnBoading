import React, {Component} from 'react';
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react';

const initialState={
    open:false,
    name:'',
    price:'',
    nameError:'',
    priceError:''
}
export default class UpdateProductModal extends Component{
    static displayName=UpdateProductModal.name;
    constructor(props){
        super();
        this.state = initialState;
        this.handleUpdate=this.handleUpdate.bind(this);
        this.validateFunction=this.validateFunction.bind(this);
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
        if(!this.state.priceError){
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

    showPopup = (e) => {
        this.setState({ open: !this.state.open });
        e.preventDefault();
        
        fetch('https://priyankaapp.azurewebsites.net/Product/GetById?id=' + this.props.state.id, {
            headers : { 
            method:'GET',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({ name: response.name, price: response.price })
        });
    };

   

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.price]:e.target.value});
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
        const data={id:this.props.state.id,name:this.state.name,price:this.state.price}
        
        fetch('https://priyankaapp.azurewebsites.net/Product/Update',{
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
                    Update Product
                  </Header>
                  <Modal.Content>
                  <Form  onSubmit={this.handleUpdate} >
                  <Form.Input className="form-group row"
                        id='id'
                        type="hidden" value='{this.state.id}'></Form.Input>
                          <Form.Input
                          fluid
                          label='Name'
                          placeholder='Your Name'
                          defaultValue={this.state.name}
                          name='name'
                          onKeyUp={(evt) => this.onChange(evt)} 
                          required
                          error={this.state.nameError}
                          ></Form.Input> 
                          <Form.Input
                          fluid
                          label='Price'
                          placeholder='Product Price'
                          name='price'
                          defaultValue={this.state.price}
                          onKeyUp={this.onChange} 
                          required
                          error={this.state.priceError}
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
