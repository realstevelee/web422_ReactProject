import React from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { withRouter } from "react-router";


class Sale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sale: {},
            loading: true
        };
        this.itemTotal = this.itemTotal.bind(this);
    }

    componentDidMount() {
        fetch(`https://desolate-crag-22920.herokuapp.com/api/sales/${this.props.id}`)
            .then(res => {
                return res.json();
            })
            .then(sale => {
                if (this.props.id === sale._id) {
                    this.props.viewedSale(sale._id);
                    this.setState({ sale, loading: false });
                }
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ loading: true });
            fetch(`https://desolate-crag-22920.herokuapp.com/api/sales/${this.props.id}`)
                .then(res => {
                    return res.json();
                })
                .then(sale => {
                    if (this.props.id === sale._id) {
                        this.props.viewedSale(sale._id);
                        this.setState({ sale, loading: false });
                    }
                    else {
                        this.setState({ sale, loading: false });
                    }
                })
        }
    }

    itemTotal(items) {
        let totalItem = 0;
        for (let i in items) {
            totalItem += items[i].price * items[i].quantity;
        }

        return totalItem;
    }

    render() {
        if (this.state.loading) {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        } else {
            if (this.state.sale._id) {
                return (<div>
                    <h1>Sale: {this.props.id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong>{this.state.sale.customer.email}</ListGroupItem>
                        <ListGroupItem><strong>age:</strong>{this.state.sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong>{this.state.sale.customer.satisfaction}/5</ListGroupItem>
                    </ListGroup>
                    <h2> Items: ${this.itemTotal(this.state.sale.items)}</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sale.items.map((items, index) =>
                                <tr key={index}>
                                    <td>{items.name}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>);
            } else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }
    }

}

export default withRouter(Sale);