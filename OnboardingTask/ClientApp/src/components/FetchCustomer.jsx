import * as React from 'react';
import { Link } from 'react-router-dom';

export class FetchCustomer extends React.Component {
    constructor() {
        super();
        //Initialize default values.
        this.state = {
            customerList: [],
            loading: true
        };
        //Calling API method using fetch and setting the customerList value and
        //also setting the loading to false. The fetch method is invoked inside
        //the constructor so that customer list will be displayed as the page loads.
        fetch('api/Customer/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ customerList: data, loading: false });
            });

        //This binding is necessary to make "this" work in the callback.
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //Render HTML elements onto the DOM.
    render() {
        //Check if the data has finished loading or not and then call the renderCustomerTable method. 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.customerList);

        return (
            <div>
                <h1>Customer List</h1>
                <p>
                    <Link to="/addCustomer">Add Customer</Link>
                </p>
                {contents}
            </div>
        );
    }

    //Returns the HTML table to the render() method. 
    //renderCustomerTable method returns an HTML table to display all the customer data 
    //on the web page.
    //Every row of the table also has two action methods - Edit and Delete - 
    //for editing and deleting the employee records.
    renderCustomerTable(customerList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Customer Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((c) =>
                        <tr key={c.id}>
                            <td></td>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.address}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEdit(c.id)}>Edit |</a>
                                <a className="action" onClick={(id) => this.handleDelete(c.id)}> Delete</a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        );
    }

    //Handle Delete request for an Customer 
    //handleDelete method accepts an id as a parameter. 
    //This will propmt the user with a confirmation box and if the user selects 'yes'
    //then it will delete the customer with this customer id.
    handleDelete(id) {
        if (!window.confirm("Do you want to delete customer with Id: " + id)) {
            return;
        }
        else {
            fetch('api/Customer/Delete/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        customerList: this.state.customerList.filter(
                            (rec) => {
                                return (rec.id !== id);
                            })
                    });
                });
        }
    }

    //handleEdit method will invoke an edit request on the customer record by 
    //passing the customer id in the URL parameter and redirects it to the AddCustomer component.
    handleEdit(id) {
        this.props.history.push("/Customer/edit/" + id);
    }
}

//To hold customer data
export class CustomerData {
    constructor() {
        this.id = 0;
        this.name = "";
        this.address = "";
    }
}