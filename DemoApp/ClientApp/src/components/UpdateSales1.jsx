import React,{ Component} from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown } from 'semantic-ui-react';  
import * as moment from 'moment'

export default class UpdateSales1 extends Component{
    static displayName=UpdateSales1.name;
    constructor(props){
        super();
        this.state = {  
            solddate:'',
            customerID:0,
            productId:0,
            storeId:0,
            customerOptions: [],
            productOptions:[],
            storeOptions:[]
        }

        this.handleSave=this.handleSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }
   
    componentDidMount() {  
        const query = new URLSearchParams(this.props.location.search);

        fetch('https://priyankaapp.azurewebsites.net/Sales/GetById?id=' + query.get("id"), {
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
                productId:result.sale.productId,
                storeId:result.sale.storeId
            });
        });
    }  

    onChange=(e)=>{  
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.price]:e.target.value});
    }  

    handleSave(event) {  
        debugger;  
        event.preventDefault();
        const query = new URLSearchParams(this.props.location.search);
        const data={id:query.get("id"),solddate:this.state.solddate,customerID:this.state.customerID,productId:this.state.productId,storeId:this.state.storeId};
        
        fetch('https://priyankaapp.azurewebsites.net/Sales/Update',{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .catch(error=>console.error('Error:',error))
        .then(response=>
            {
                this.props.history.push('/sales')
            });
    }

    handleCancel(e){
        e.preventDefault();
        let path='/sales';
        this.props.history.push(path);
    }

    handleChange = (e, result) => {
        const { name, value } = result;
        this.setState({
           [name]: value
          });
      };

    render(){
        const{name,price}=this.state;
        return(
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.id}/>
                </div>
                <div className="form-group row">
                    <div class="col-md-2">
                        <label className="control-label col-md-12" htmlFor="date">Date sold</label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" name="solddate" className="form-control" 
                            value={moment(this.state.solddate).format('DD/MM/YYYY')} onChange={this.onChange} required></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div class="col-md-2">
                        <label className="control-label col-md-12" htmlFor="Customer">Customer</label>
                    </div>
                    <div className="col-md-4">
                        <Dropdown
                            placeholder='Customers'
                            fluid
                            search
                            selection
                            options={this.state.customerOptions} 
                            value={this.state.customerID}
                            onChange={this.handleChange} name="customerId" />
                    </div> 
                </div>
                <div className="form-group row">
                    <div class="col-md-2">
                        <label className="control-label col-md-12" htmlFor="Product">Product</label>
                    </div>
                    <div className="col-md-4">
                        <Dropdown
                            placeholder='Products'
                            fluid
                            search
                            selection
                            options={this.state.productOptions}
                            value={this.state.productId}
                            onChange={this.handleChange} name="productId" />
                    </div> 
                </div>
                <div className="form-group row">
                    <div class="col-md-2">
                        <label className="control-label col-md-12" htmlFor="Store">Store</label>
                    </div>
                    <div className="col-md-4">
                        <Dropdown
                            placeholder='Stores'
                            fluid
                            search
                            selection
                            options={this.state.storeOptions}
                            value={this.state.storeId}
                            onChange={this.handleChange} name="storeId" />
                    </div> 
                </div>
                <div className="form-group row">
                    <div class="col-md-2"></div>
                    <div class="col-md-4">
                        <Button positive onClick={this.handleSave}>Save</Button>
                        <Button negative onClick={this.handleCancel}>Cancel</Button>
                    </div>
                </div>
                <div></div>
            </form>
        )
    }
}