import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Customer from './components/Customer';
import CreateCustomer from './components/CreateCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import Product from './components/Product';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import Store from './components/Store';
import CreateStore from './components/CreateStore';
import UpdateStore1 from './components/UpdateStore1';
import Sales from './components/Sales';
import CreateSales from './components/CreateSales';
import UpdateSales1 from './components/UpdateSales1';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/customer' component={Customer} />
                <Route path='/createcustomer' component={CreateCustomer} />
                <Route path='/updatecustomer' component={UpdateCustomer} />
                <Route path='/product' component={Product} />
                <Route path='/createproduct' component={CreateProduct} />
                <Route path='/updateproduct' component={UpdateProduct} />
                <Route path='/store' component={Store} />
                <Route path='/createstore' component={CreateStore} />
                <Route path='/updatestore1' component={UpdateStore1} />
                <Route path='/sales' component={Sales} />
                <Route path='/createsales' component={CreateSales} />
                <Route path='/updatesales1' component={UpdateSales1} />
            </Layout>
        );
    }
}
