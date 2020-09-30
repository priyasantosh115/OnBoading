import React,{ Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'
import * as moment from 'moment'

export default class Sales extends Component{
    constructor(props){
        super();
        this.state={data:[],loading:true,id:0};
    }  

    componentDidMount(){
        this.populateSalesData();
    }

    populateSalesData(){
        fetch('https://priyankaapp.azurewebsites.net/Sales/GetSales')
            .then(res=>res.json())
            .catch(error=>console.error('Error:',error))
            .then(result=>{
                this.setState({data:result.sales,loading:false});
            });
    }
    
    componentWillMount(){
        console.log("DidMount");
    }
    
    componentWillUnmount(){        
        console.log("DidUnMount");
    }
      
    render(){
        let items = this.state.loading 
            ? <p><em>Loading...</em></p>
            : this.renderSalesTable(this.state.data);

        return(
          <div>
              <h1 id="tableLabel">Sales</h1>
              <p>This Component fetches product data from server.</p>
              <p>
                  <Link to="/createsales">Create New Sales</Link>
              </p>
              { items }
          </div>  
        );
    }

    renderSalesTable(data){
        var sales=this.state.data 
        return(
            <table class="ui celled padded table">
                <thead>
                    <tr>
                        <th className="single line"></th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Date Sold</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>
                        <tr key={item.Id}>
                            <td></td>
                            <td>{item.customer.name}</td>
                            <td>{item.product.name}</td>
                            <td>{item.store.name}</td>
                            <td>{moment(item.soldDate).format('DD/MM/YYYY')}</td>
                            <td>
                                <Link to={"/updateSales1?id="+ item.id} className="btn btn-success">Edit</Link>
                            </td>
                            <td>
                                <Button negative onClick={(id)=>this.handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>                    
                    <tr>
                        <th></th>
                        <th colSpan="1"></th>
                        <th colSpan="5">
                            <div class="ui right floated pagination menu">
                                <a class="icon item">
                                <i class="left chevron icon"></i>
                                </a>
                                <a class="item" >1</a>
                                <a class="item">2</a>
                                <a class="item">3</a>
                                <a class="item">4</a>
                                <a class="icon item">
                                <i class="right chevron icon"></i>
                                </a>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    }
    
    handleDelete(id){
        if(!window.confirm("Do you want to delete this record ?"+id)){
            return;
        }
        else{
            fetch('https://priyankaapp.azurewebsites.net/Sales/Delete/'+id,{
                method:'POST',
                headers:{'Content-Type':'application/json'}
            })
            .then(datas=>{
                this.setState({
                    data: this.state.data.filter((rec)=>{
                        return rec.Id !== id;
                    })
                });
                this.props.history.push('/sales')
            });
        }
    }           
}
