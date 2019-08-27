import * as React from 'react';
import { Link } from 'react-router-dom';

export class FetchStore extends React.Component {
    constructor() {
        super();
        //Initialize default values.
        this.state = {
            storeList: [],
            loading: true
        };
        //Calling API method using fetch and setting the storeList value and
        //also setting the loading to false. The fetch method is invoked inside
        //the constructor so that store list will be displayed as the page loads.
        fetch('api/Store/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ storeList: data, loading: false });
            });

        //This binding is necessary to make "this" work in the callback.
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //Render HTML elements onto the DOM.
    render() {
        //Check if the data has finished loading or not and then call the renderStoreTable method. 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStoreTable(this.state.storeList);

        return (
            <div>
                <h1>Store List</h1>
                <p>
                    <Link to="/addStore">Add Store</Link>
                </p>
                {contents}
            </div>
        );
    }

    //Returns the HTML table to the render() method. 
    //renderStoreTable method returns an HTML table to display all the store data 
    //on the web page.
    //Every row of the table also has two action methods - Edit and Delete - 
    //for editing and deleting the employee records.
    renderStoreTable(storeList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Store Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {storeList.map((s) =>
                        <tr key={s.id}>
                            <td></td>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEdit(s.id)}>Edit |</a>
                                <a className="action" onClick={(id) => this.handleDelete(s.id)}> Delete</a>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        );
    }

    //Handle Delete request for an Store 
    //handleDelete method accepts an id as a parameter. 
    //This will propmt the user with a confirmation box and if the user selects 'yes'
    //then it will delete the store with this store id.
    handleDelete(id) {
        if (!window.confirm("Do you want to delete store with Id: " + id)) {
            return;
        }
        else {
            fetch('api/Store/Delete/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        storeList: this.state.storeList.filter(
                            (rec) => {
                                return (rec.id !== id);
                            })
                    });
                });
        }
    }

    //handleEdit method will invoke an edit request on the store record by 
    //passing the store id in the URL parameter and redirects it to the AddStore component.
    handleEdit(id) {
        this.props.history.push("/Store/edit/" + id);
    }
}

//To hold store data
export class StoreData {
    constructor() {
        this.id = 0;
        this.name = "";
        this.address = "";
    }
}