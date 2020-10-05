import React,{Component} from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Pagination } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import CreateStoreModal from "./CreateStoreModal";
import UpdateStoreModal from "./UpdateStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";

export default class Store extends Component{
    constructor(props){
        super();
        this.state={data:[],loading:true,id:0,selectedItem:10,currentPage:1};
    }      

    onDropdownChangeEvent=(event,{value})=>{
        this.populateStoreData();
        this.setState({selectedItem:value,currentPage:1});
    };

    onPageChange=(event,dat)=>{
        this.populateStoreData();
        this.setState({currentPage:dat.activePage,
        });
    };

    options = [
        { key: 1, text: "5", value: 5 },
        { key: 2, text: "10", value: 10 },
        { key: 3, text: "20", value: 20 },
        { key: 4, text: "30", value: 30 }
    ];

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
            : this.renderStoreTable(this.state.data);       

        return(
          <div>
              <h1 id="tableLabel">Store</h1>
              <p>This Component fetches Store data from server.</p>
              <p>
              <CreateStoreModal
          getDataCreate={this.populateStoreData} />
              </p>
              { items }
          </div>  
        );
    }

    renderStoreTable(data){ 
       // let customers = this.state.data; 
        let entries = this.state.selectedItem; 
        //Calculating total pages 
        this.totalpages = parseInt(data.length / entries); 
        if (data.length % entries !== 0) { this.totalpages++; }
         //Calculate number of entries to show 
         let skip = 0; skip = entries * (this.state.currentPage - 1);
          let start = skip + 1; let end = skip + entries; 
          if (end > data.length) { end = data.length; } 
          //Truncate customer according to number of entries 
          data = data.slice(start - 1, end);
        //var options = this.state.data;
        return(
            <Table striped>
               <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>{
                    data.map(item=>
                        <Table.Row key={item.Id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.address}</Table.Cell>
                            <Table.Cell>
                            <UpdateStoreModal
                      getDataUpdate={this.populateStoreData}
                      state={item} />
                                    </Table.Cell>
                            <Table.Cell>
                            <DeleteStoreModal
                      getDataDelete={this.populateStoreData}
                      state={item} />
                                </Table.Cell>
                            </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>                    
                <Table.Row>
                        <Table.HeaderCell colSpan="3">
                        <Table.Cell>
                            <Dropdown
                                placeholder='10'
                                defaultSelectedLabel='10'
                                options={this.options}
                                onChange={this.onDropdownChangeEvent}
                                selectedLabel={this.value}
                            /></Table.Cell>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                            <Table.Cell>
                                <Pagination 
                                    id="sidepage"
                                    defaultActivePage={1}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    totalPages={this.totalpages}
                                    onPageChange={this.onPageChange}
                                />
                            </Table.Cell>
                            </Table.HeaderCell>
                     </Table.Row>
                     <Table.Row></Table.Row>
                     <Table.Row></Table.Row>
                </Table.Footer>
            </Table>
        );
    }          
}