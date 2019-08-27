import * as React from 'react';
import { Link } from 'react-router-dom';

export class FetchSale extends React.Component {
    constructor() {
        super();
        //Initialize default values.
        this.state = {
            saleList: [],
            loading: true
        };
        //Calling API method using fetch and setting the saleList value and
        //also setting the loading to false. The fetch method is invoked inside
        //the constructor so that sale list will be displayed as the page loads.
        fetch('api/Sale/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ saleList: data, loading: false });
            });

        //This binding is necessary to make "this" work in the callback.
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //Render HTML elements onto the DOM.
    render() {
        //Check if the data has finished loading or not and then call the renderSaleTable method. 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSaleTable(this.state.saleList);

        return (
            <div>
                <h1>Sale List</h1>
                <p>
                    <Link to="/addSale">Add Sale</Link>
                </p>
                {contents}
            </div>
        );
    }

    //Returns the HTML table to the render() method. 
    //renderSaleTable method returns an HTML table to display all the sale data 
    //on the web page.
    //Every row of the table also has two action methods - Edit and Delete - 
    //for editing and deleting the employee records.
    renderSaleTable(saleList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sale Id</th>
                        <th>Customer Id</th>
                        <th>Product Id</th>
                        <th>Store Id</th>
                        <th>Date Sold</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {saleList.map((s) =>
                        <tr key={s.id}>
                            <td></td>
                            <td>{s.id}</td>
                            <td>{s.customerId}</td>
                            <td>{s.productId}</td>
                            <td>{s.storeId}</td>
                            <td>{s.dateSold}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEdit(s.id)}>Edit |</a>
                                <a className="action" onClick={(id) => this.handleDelete(s.id)}> Delete</a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        );
    }

    //Handle Delete request for an Sale 
    //handleDelete method accepts an id as a parameter. 
    //This will propmt the user with a confirmation box and if the user selects 'yes'
    //then it will delete the sale with this sale id.
    handleDelete(id) {
        if (!window.confirm("Do you want to delete sale with Id: " + id)) {
            return;
        }
        else {
            fetch('api/Sale/Delete/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        saleList: this.state.saleList.filter(
                            (rec) => {
                                return (rec.id !== id);
                            })
                    });
                });
        }
    }

    //handleEdit method will invoke an edit request on the sale record by 
    //passing the sale id in the URL parameter and redirects it to the AddSale component.
    handleEdit(id) {
        this.props.history.push("/Sale/edit/" + id);
    }
}

//To hold sale data
export class SaleData {
    constructor() {
        this.id = 0;
        this.customerId = null;
        this.productId = null;
        this.storeId = null;
        this.dateSold = new Date().toDateString;
    }
}