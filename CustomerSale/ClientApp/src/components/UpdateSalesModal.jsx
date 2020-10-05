import React, {Component} from 'react';
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react';
import * as moment from 'moment';
import {DateInput} from 'semantic-ui-calendar-react';

const initialState={
    solddate:'',
    customerID:0,
    productID:0,
    storeID:0, 
    customerError:'',
    productError:'',
   storeError:'',
    dateError:'',
    customerOptions: [],
    productOptions:[],
    storeOptions:[]
}
export default class UpdateSalesModal extends Component{
    static displayName=UpdateSalesModal.name;
    constructor(props){
        super();
        this.state = initialState;

        this.handleUpdate=this.handleUpdate.bind(this);
        this.validateFunction=this.validateFunction.bind(this);
    }
    validateFunction() {
        let customerError="";
        let productError="";
        let storeError="";
        let dateError="";
        let notError = true;
        
        if(!this.state.solddate){
          dateError="Sold date is required";
            this.state.dateError = dateError;
            notError = false;
        }
        else
        {
            this.state.dateError = "";
        }
        if(!this.state.customerID){
          customerError="Customer's Name is required";
            this.state.customerError = customerError;
            notError = false;
        }
        else
        {
            this.state.customerError = "";
        }
        if(!this.state.productID){
          productError="Product's Name is required";
            this.state.productError = productError;
            notError = false;
        }
        else
        {
            this.state.productError = "";
        }
        if(!this.state.storeID){
          storeError="Store's Name is required";
            this.state.storeError = storeError;
            notError = false;
        }
        else
        {
            this.state.storeError = "";
        }
        if(dateError||customerError||productError||storeError){
            this.setState({dateError,customerError,productError,storeError});
            notError = false;
        }
        return notError;
    };
  
    showPopup = (e) => {
      this.setState({ open: !this.state.open }); 
      e.preventDefault();
      fetch('https://priyankaapp.azurewebsites.net/Sales/GetById?id=' + this.props.state.id, {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }  
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                customerOptions: result.customers.map((name, id)=>({
                    key: result.customers[id].id,
                    text: result.customers[id].name,
                    value: result.customers[id].id,
                })
            )});

            this.setState({
                productOptions: result.products.map((name, id)=>({
                    key: result.products[id].id,
                    text: result.products[id].name,
                    value: result.products[id].id,
                })
            )});

            this.setState({
                storeOptions: result.stores.map((name, id)=>({
                    key: result.stores[id].id,
                    text: result.stores[id].name,
                    value: result.stores[id].id,
                })
            )});

            this.setState({
                solddate:result.sale.soldDate,
                customerID:result.sale.customerId,
                productID:result.sale.productId,
                storeID:result.sale.storeId
            });

            this.forceUpdate();
        });
    };
  

    onChange=(e)=>{  
        this.setState({[e.target.solddate]:e.target.value});
        this.validateFunction();
        this.forceUpdate();
    }  

    handleUpdate(event) {   
        event.preventDefault();
        const isValid =this.validateFunction();
        if (!isValid){
            console.log(this.state);
            this.forceUpdate();
        }
        else
        {
        event.preventDefault();
        const data={id:this.props.state.id,solddate:this.state.solddate,customerID:this.state.customerID,productID:this.state.productID,storeID:this.state.storeID};
        
        fetch('https://priyankaapp.azurewebsites.net/Sales/Update',{
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

    handleChange = (e, result) => {
        const { name, value } = result;
        this.setState({
           [name]: value
          });
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
                    Update Sales
                  </Header>
                  <Modal.Content>
                  <Form  onSubmit={this.handleUpdate} >
                  <Form.Input><div className="form-group row"
                  id='id'
                  type="hidden" value='{this.state.id}'/></Form.Input>
                    <DateInput
                        fluid
                        label='Sold Date'
                        placeholder='Sold Date'
                        name='solddate'
                        onChange={this.handleChange} 
                        required
                        closeOnMouseLeave='true'
                        value={moment(this.state.solddate).format('MM/DD/YYYY')}
                        error={this.state.dateError}>
                    </DateInput> 
                    <Form.Dropdown
                        fluid
                        label='Customer Name'
                        placeholder='Customers'
                        name="customerID"
                        onChange={this.handleChange} 
                        value={this.state.customerID}
                        required
                        options={this.state.customerOptions}
                        error={this.state.customerError}>
                    </Form.Dropdown>
                    <Form.Dropdown
                        fluid
                        label='Product Name'
                        placeholder='Products'
                        name="productID"
                        onChange={this.handleChange} 
                        required
                        value={this.state.productID}
                        options={this.state.productOptions}
                        error={this.state.productError}>
                    </Form.Dropdown>
                    <Form.Dropdown
                        fluid
                        label='Store Name'
                        placeholder='Stores'
                        name="storeID"
                        onChange={this.handleChange} 
                        required
                        value={this.state.storeID}
                        options={this.state.storeOptions}
                        error={this.state.storeError}>
                    </Form.Dropdown>
                </Form>
            </Modal.Content>
            <Modal.Actions>
              <div className="form-group row">
              <Button color='green' onClick={this.handleUpdate}><Icon name='checkmark' />Edit</Button>
                          <Button color='black' onClick={this.showPopup}>Cancel</Button>
                </div>
            </Modal.Actions>            
          </Modal>
        )
};


    }