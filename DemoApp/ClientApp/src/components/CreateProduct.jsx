import React,{ Component} from "react";
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

export default class CreateProduct extends Component{
static displayName=CreateProduct.name;
    constructor(props){
        super();
        this.state={ 
            name:'',
            price:''
        }
        this.handleSave=this.handleSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }


handleSave(event){
    event.preventDefault();

    const data={name:this.state.name,price:this.state.price}
    
    fetch('https://priyankaapp.azurewebsites.net/Product/Create',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>res.json())
    .catch(error=>console.error('Error:',error))
    .then(response=>
        {
            this.props.history.push('/product')
        });
}

onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
    this.setState({[e.target.price]:e.target.value});
}

handleCancel(e){
    e.preventDefault();
    let path='/product';
    this.props.history.push(path);
}

render(){
    const{name,price}=this.state;
  return(
      <form onSubmit={this.handleSave}>
          <div className="form-group row">
              <input type="hidden" name="id" value='{this.state.id}'/>
          </div>
          <div className="form-group row">
              <div>
             <label className="control-label col-md-12" htmlFor="name">Name</label></div>
             <div className="col-md-4">
                 <input type="text" name="name" className="form-control" onChange={this.onChange} required></input>
             </div></div>
             <div className="form-group row">
                 <div>
             <label className="control-label col-md-12" htmlFor="price">Price</label></div>
             <div className="col-md-4">
                 <input type="text" name="price" className="form-control" onChange={this.onChange} required></input>
             </div> </div>
          <div className="form-group row">
              <Button positive onClick={this.handleSave}>Save</Button>
              <Button negative onClick={this.handleCancel}>Cancel</Button>
          </div>
          <div></div>
      </form>
  )  
}
}