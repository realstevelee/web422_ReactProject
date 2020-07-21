import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            currentPage: 1
        }

        this.getData = this.getData.bind(this);
        this.NextPage = this.NextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    getData(page) {
        fetch(`https://desolate-crag-22920.herokuapp.com/api/sales?page=${page}&perPage=10`)
            .then((res) => {
                return res.json();
            })
            .then((jsonData) => {
                this.setState({sales: jsonData});
            });
    }

    componentDidMount() {
        this.setState(this.getData(this.state.currentPage));
    }

    previousPage() {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1);
            this.setState({currentPage: this.state.currentPage - 1});
        }
    }

    NextPage() {
        this.getData(this.state.currentPage + 1);
        this.setState({currentPage: this.state.currentPage + 1});
    }

    render() {
        if (this.state.sales.length > 0) {
            return (
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map((sale) =>
                                <tr key={sale._id} onClick={() => { this.props.history.push(`/Sale/${sale._id}`) }}>
                                    <td>{sale.customer.email}</td>
                                    <td>{sale.storeLocation}</td>
                                    <td>{sale.items.length}</td>
                                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.NextPage} />
                    </Pagination>
                </div>
            );
        } else {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        }
    }

}



export default withRouter(Sales);