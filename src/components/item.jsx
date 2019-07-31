import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
class Item extends Component {

    state = {
        item: {},
        navigationDtl: {},
        stocks: []
    }

    componentDidMount() {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleItemChange = (event) => {
        console.log("Target name", event.target.name);
        console.log(event.target.value);
        let item = this.state.item;
        item[event.target.name] = event.target.value;
        this.setState({ item });
    }

    handleStockChange = (event, index) => {
        console.log("Target name", event.target.name);
        console.log("Index: ", index);
        let stocks = [...this.state.stocks];
        console.log("Cell: ", stocks[index][event.target.name]);
        stocks[index][event.target.name] = event.target.value;
        this.setState({ stocks });
    }

    newItem = () => {
        this.setState({ item: {}, navigationDtl: { first: true, last: true }, stocks: [] });
    }

    saveItem = () => {
        console.log("Post: Object sent: ", this.state.item);
        axios.post('http://localhost:8089/item/save', this.state.item)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteItem = () => {
        console.log("Delete: Item Code sent: ", this.state.item.itemCode);
        axios.delete('http://localhost:8089/item/delete/' + this.state.item.itemCode)
            .then(res => {
                console.log("Delete: Response: ", res);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstItem = () => {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    previousItem = () => {
        axios.get('http://localhost:8089/item/previous')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    nextItem = () => {
        axios.get('http://localhost:8089/item/next')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    lastItem = () => {
        axios.get('http://localhost:8089/item/last')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    saveStock = () => {
        console.log("Post: Object sent: ", JSON.stringify(this.state.stocks));
        axios.post('http://localhost:8089/stock/saveAll', this.state.stocks)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                this.setState({ stock: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    addStock = () => {
        let newStock = { item: this.state.item.itemCode };
        this.setState(
            {
                stocks: [...this.state.stocks, newStock]
            }
        );
    }


    render() {
        const { item, navigationDtl, stocks } = this.state;

        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemCode"
                                placeholder="Item Code"
                                aria-label="Item Code"
                                aria-describedby="basic-addon1"
                                readOnly
                                value={item.itemCode || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Item Barcode</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemBarcode"
                                placeholder="Item Barcode"
                                aria-label="Item Barcode"
                                aria-describedby="basic-addon2"
                                value={item.itemBarcode || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Desc.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemDesc"
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                aria-describedby="basic-addon1"
                                value={item.itemDesc || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Category</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemCategory"
                                placeholder="Item Category"
                                aria-label="Item Category"
                                aria-describedby="basic-addon1"
                                value={item.itemCategory || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemUom"
                                placeholder="Item U.O.M"
                                aria-label="Item U.O.M"
                                aria-describedby="basic-addon1"
                                value={item.itemUom || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Purchase Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="purchasePrice"
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                aria-describedby="basic-addon1"
                                value={item.purchasePrice || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Sale Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="salePrice"
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                aria-describedby="basic-addon1"
                                value={item.salePrice || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Max. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="maxStock"
                                placeholder="Max. Stock"
                                aria-label="Max. Stock"
                                aria-describedby="basic-addon1"
                                value={item.maxStock || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Min. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="minStock"
                                placeholder="Min. Stock"
                                aria-label="Min. Stock"
                                aria-describedby="basic-addon1"
                                value={item.minStock || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveStartDate"
                                placeholder="Effective Start Date"
                                aria-label="Effective Start Date"
                                aria-describedby="basic-addon1"
                                onSelect={this.handleItemChange}
                                value={item.effectiveStartDate || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveEndDate"
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                aria-describedby="basic-addon1"
                                value={item.effectiveEndDate || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>
                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.firstItem}
                                className="mr-1"
                                active>First
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.previousItem}
                                className="mr-1"
                                active>Previous
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.nextItem}
                                className="mr-1"
                                active>Next
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.lastItem}
                                className="ymr-1"
                                active>Last
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.newItem}
                                className="mr-1"
                                active>Add
                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.deleteItem}
                                className="mr-1"
                                active>Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.saveItem}
                                className="mr-1"
                                active>Save
                            </Button>
                            <Button
                                variant="primary"
                                /* disabled={navigationDtl.last}
                                onClick={this.nextItem} */
                                className="mr-1"
                                active>Undo
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.addStock}
                                className="mr-1"
                                active>Add Stock
                                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.saveStock}
                                className="mr-1"
                                active>Save Stock
                                            </Button>
                        </ButtonToolbar>
                    </Form>
                    <Table
                        responsive>
                        <thead>
                            <tr>
                                <th>Stock Date</th>
                                <th>Quantity</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks && stocks.map((stock, index) => (
                                    <tr key={stock.itemStockId}>
                                        <td>
                                            <FormControl
                                                type="date"
                                                name="itemStockDate"
                                                placeholder="Stock Date"
                                                aria-label="Stock Date"
                                                aria-describedby="basic-addon1"
                                                value={stock.itemStockDate || ''}
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="number"
                                                name="qnty"
                                                placeholder="Stock Quantity"
                                                aria-label="Stock Quantity"
                                                aria-describedby="basic-addon1"
                                                value={stock.qnty || ''}
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="text"
                                                name="remarks"
                                                placeholder="Remarks"
                                                aria-label="Remarks"
                                                aria-describedby="basic-addon1"
                                                value={stock.remarks || ''}
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <ButtonToolbar>
                                                <Button
                                                    variant="primary"
                                                    // disabled={navigationDtl.first}
                                                    onClick={this.addStock}
                                                    className="mr-1"
                                                    active>Add Stock
                                            </Button>
                                                <Button
                                                    variant="primary"
                                                    // disabled={navigationDtl.first}
                                                    onClick={this.saveStock}
                                                    className="mr-1"
                                                    active>Save Stock
                                            </Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Item;