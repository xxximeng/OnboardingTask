import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchCustomer } from './components/FetchCustomer';
import { AddCustomer } from './components/AddCustomer';
import { FetchProduct } from './components/FetchProduct';
import { AddProduct } from './components/AddProduct';
import { FetchStore } from './components/FetchStore';
import { AddStore } from './components/AddStore';
import { FetchSale } from './components/FetchSale';
import { AddSale } from './components/AddSale';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/fetchcustomer' component={FetchCustomer} />
                <Route path='/addcustomer' component={AddCustomer} />
                <Route path='/customer/edit/:cusid' component={AddCustomer} />
                <Route path='/fetchproduct' component={FetchProduct} />
                <Route path='/addproduct' component={AddProduct} />
                <Route path='/product/edit/:proid' component={AddProduct} />
                <Route path='/fetchstore' component={FetchStore} />
                <Route path='/addstore' component={AddStore} />
                <Route path='/store/edit/:stoid' component={AddStore} />
                <Route path='/fetchsale' component={FetchSale} />
                <Route path='/addsale' component={AddSale} />
                <Route path='/sale/edit/:salid' component={AddSale} />
            </Layout>
        );
    }
}
