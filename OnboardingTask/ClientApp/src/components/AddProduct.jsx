import * as React from 'react';
import { ProductData } from './FetchProduct';

//This component is used for both adding and editing the product data.
//Since we use ProductData to hold the data, we need to import it from the FetchProduct component.

export class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //To show "Create" or "Edit" on the top of the page.
            title: "",
            //To check if the page has finished loading data.
            loading: true,
            //To hold the product data to bind it to the HTML form.
            proData: new ProductData()
        };

        //This component will handle both Add and Edit requests. The system differentiate
        //between both requests by routing. We need to define two different route parameters
        //in the route.tsx file : one for adding an product record and another for editing 
        //an product record. 

        var proid = this.props.match.params["proid"];

        //This will set state for Edit Product  
        //If an edit request is made then the product id will be passed in the parameter.
        //proid read the value of the URL parameter. If proid > 0 then this an edit request
        if (proid > 0) {
            fetch('api/Product/Details/' + proid)
                .then(response => response.json())
                .then(data => {
                    //Set the value of the title to "Edit", fill in the data of the proData
                    //property, and set loading to false
                    this.setState({ title: "Edit", loading: false, proData: data });
                });
        }
        //This will set state for Add Product  
        //If the proid value is not set then it is an add request
        else {
            //We will set the value of title to "Create" and set loading to false.
            this.state = { title: "Create", loading: false, proData: new ProductData() };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    //This will handle the submit form event.  
    //This will handle the save event on the form. Based on whether the URL has an proid
    //parameter or not, we will send a request for PUT or POST and upon having success,
    //redirect the user back to the FetchProduct component.
    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit Product.  
        if (this.state.proData.id) {
            fetch('api/Product/Edit', {
                method: 'PUT',
                body: data,
            }).then(response => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                });
        }

        // POST request for Add Product.  
        else {
            fetch('api/Product/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                });
        }
    }

    //This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchProduct");
    }

    //Returns the HTML Form to the render() method.  
    //This method return an HTML form to be diplayed on the webpage. 
    //We have set the default value in all the fields of the form. 
    //If an Add request is made then all the fields are empty. If an edit request is 
    //made then it will fill the data of the corresponding product in the fields. 
    renderCreateForm() {
        return (<form onSubmit={this.handleSave}>
            <div className="form-group row">
                <input type="hidden" name="id" value={this.state.proData.id} />
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                <div className="col-md-4">
                    <input className="form-control" type="text" name="name" defaultValue={this.state.proData.name} required />
                </div>
            </div>
            <div className="form-group row">
                <label className=" control-label col-md-12" htmlFor="Price">Price</label>
                <div className="col-md-4">
                    <input className="form-control" type="decimal" name="price" defaultValue={this.state.proData.price} required />
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Save</button>
                <button className="btn" onClick={this.handleCancel}>Cancel</button>
            </div>
        </form>);
    }
}
