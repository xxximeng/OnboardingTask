import * as React from 'react';
import { SaleData } from './FetchSale';

//This component is used for both adding and editing the sale data.
//Since we use SaleData to hold the data, we need to import it from the FetchSale component.

export class AddSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //To show "Create" or "Edit" on the top of the page.
            title: "",
            customerList: [],
            productList: [],
            storeList: [],
            //To check if the page has finished loading data.
            loading: true,
            //To hold the sale data to bind it to the HTML form.
            salData: new SaleData()
        };

        fetch('api/Customer/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ customerList: data });
            });

        fetch('api/Product/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ productList: data });
            });

        fetch('api/Store/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ storeList: data });
            });
        //This component will handle both Add and Edit requests. The system differentiate
        //between both requests by routing. We need to define two different route parameters
        //in the route.tsx file : one for adding an sale record and another for editing 
        //an sale record. 

        var salid = this.props.match.params["salid"];

        //This will set state for Edit Sale  
        //If an edit request is made then the sale id will be passed in the parameter.
        //salid read the value of the URL parameter. If salid > 0 then this an edit request
        if (salid > 0) {
            fetch('api/Sale/Details/' + salid)
                .then(response => response.json())
                .then(data => {
                    //Set the value of the title to "Edit", fill in the data of the salData
                    //property, and set loading to false
                    this.setState({ title: "Edit", loading: false, salData: data });
                });
        }
        //This will set state for Add Sale  
        //If the salid value is not set then it is an add request
        else {
            //We will set the value of title to "Create" and set loading to false.
            this.state = {
                title: "Create",
                customerList: [],
                productList: [],
                storeList: [],
                loading: false,
                salData: new SaleData()
            };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.customerList, this.state.productList, this.state.storeList);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Sale</h3>
            <hr />
            {contents}
        </div>;
    }

    //This will handle the submit form event.  
    //This will handle the save event on the form. Based on whether the URL has an salid
    //parameter or not, we will send a request for PUT or POST and upon having success,
    //redirect the user back to the FetchSale component.
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit Sale.  
        if (this.state.salData.id) {
            fetch('api/Sale/Edit', {
                method: 'PUT',
                body: data,
            }).then(response => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchSale");
                });
        }

        // POST request for Add Sale.  
        else {
            fetch('api/Sale/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchSale");
                });
        }
    }

    //This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchSale");
    }

    //Returns the HTML Form to the render() method.  
    //This method return an HTML form to be diplayed on the webpage. 
    //We have set the default value in all the fields of the form. 
    //If an Add request is made then all the fields are empty. If an edit request is 
    //made then it will fill the data of the corresponding sale in the fields. 
    renderCreateForm(customerList, productList, storeList) {
        return (<form onSubmit={this.handleSave}>
            <div className="form-group row">
                <input type="hidden" name="id" value={this.state.salData.id} />
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="CustomerId">Customer Id</label>
                <div className="col-md-4">
                    <select defaultValue={this.state.salData.customerId} className="form-control" data-val="true" name="CustomerId" required>  
                        <option value="">-- Select Customer --</option>
                        {customerList.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}  
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="ProductId">Product Id</label>
                <div className="col-md-4">
                    <select defaultValue={this.state.salData.productId} className="form-control" data-val="true" name="ProductId" required>
                        <option value="">-- Select Product --</option>
                        {productList.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="StoreId">Store Id</label>
                <div className="col-md-4">
                    <select defaultValue={this.state.salData.storeId} className="form-control" data-val="true" name="StoreId" required>
                        <option value="">-- Select Store --</option>
                        {storeList.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="DateSold">Date Sold</label>
                <div className="col-md-4">
                    <input className="form-control" type="date" name="dateSold" defaultValue={this.state.salData.dateSold} required />
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Save</button>
                <button className="btn" onClick={this.handleCancel}>Cancel</button>
            </div>
        </form>);
    }
}
