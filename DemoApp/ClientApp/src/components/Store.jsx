import React,{ Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

export default class Store extends Component{
    constructor(props){
        super();
        this.state={data:[],loading:true,id:0};
    }  

    componentDidMount(){
        this.populateStoreData();
    }

    populateStoreData(){
        axios.get('https://priyankaapp.azurewebsites.net/Store/GetStore')
        .then((result) =>{
            console.log(result.data);
            this.setState({
              data:result.data,loading:false});
        }).catch((error) =>{
            console.log(error);
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
            : this.renderCustomerTable(this.state.data);

        return(
          <div>
              <h1 id="tableLabel">Store</h1>
              <p>This Component fetches store data from server.</p>
              <p>
                  <Link to="/createstore">Create New Store</Link>
              </p>
              { items }
          </div>  
        );
    }

    renderCustomerTable(data){ 
        return(
            <table class="ui celled padded table">
                <thead>
                    <tr>
                        <th className="single line"></th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    data.map(item=>
                        <tr key={item.Id}>
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>
                                <Link to={"/updatestore1?id="+ item.id} className="btn btn-success">Edit</Link>
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
            fetch('https://priyankaapp.azurewebsites.net/Store/Delete/'+id,{
                method:'POST',
                headers:{'Content-Type':'application/json'}
            })
            .then(datas=>{
                this.setState({
                    datas: this.state.data.filter((rec)=>{
                        return rec.Id !== id;
                    })
                });
                this.props.history.push('/store')
            });
        }
    }           
}
