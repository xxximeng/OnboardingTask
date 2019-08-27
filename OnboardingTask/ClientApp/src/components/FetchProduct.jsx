import * as React from 'react';
import { Link } from 'react-router-dom';

export class FetchProduct extends React.Component {
    constructor() {
        super();
        //Initialize default values.
        this.state = {
            productList: [],
            loading: true
        };
        //Calling API method using fetch and setting the productList value and
        //also setting the loading to false. The fetch method is invoked inside
        //the constructor so that product list will be displayed as the page loads.
        fetch('api/Product/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ productList: data, loading: false });
            });

        //This binding is necessary to make "this" work in the callback.
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //Render HTML elements onto the DOM.
    render() {
        //Check if the data has finished loading or not and then call the renderProductTable method. 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.productList);

        return (
            <div>
                <h1>Product List</h1>
                <p>
                    <Link to="/addProduct">Add Product</Link>
                </p>
                {contents}
            </div>
        );
    }

    //Returns the HTML table to the render() method. 
    //renderProductTable method returns an HTML table to display all the product data 
    //on the web page.
    //Every row of the table also has two action methods - Edit and Delete - 
    //for editing and deleting the employee records.
    renderProductTable(productList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((p) =>
                        <tr key={p.id}>
                            <td></td>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEdit(p.id)}>Edit |</a>
                                <a className="action" onClick={(id) => this.handleDelete(p.id)}> Delete</a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        );
    }

    //Handle Delete request for an Product 
    //handleDelete method accepts an id as a parameter. 
    //This will propmt the user with a confirmation box and if the user selects 'yes'
    //then it will delete the product with this product id.
    handleDelete(id) {
        if (!window.confirm("Do you want to delete product with Id: " + id)) {
            return;
        }
        else {
            fetch('api/Product/Delete/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        productList: this.state.productList.filter(
                            (rec) => {
                                return (rec.id !== id);
                            })
                    });
                });
        }
    }

    //handleEdit method will invoke an edit request on the product record by 
    //passing the product id in the URL parameter and redirects it to the AddProduct component.
    handleEdit(id) {
        this.props.history.push("/Product/edit/" + id);
    }
}

//To hold product data
export class ProductData {
    constructor() {
        this.id = 0;
        this.name = "";
        this.price = "";
    }
}