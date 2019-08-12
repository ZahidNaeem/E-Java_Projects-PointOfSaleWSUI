import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, ButtonGroup, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from 'react-select'
class Item extends Component {

    state = {
        item: {},
        navigationDtl: {},
        stocks: [],
        itemAlert: false,
        stockAlert: false,
        stockIndex: null
    }

    componentDidMount() {
        this.firstItem();
    }

    handleItemChange = (event) => {
        const { name, value } = event.target;
        console.log("Target name", name);
        console.log(value);
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    handleSelectChange = (name, value) => {
        let item = { ...this.state.item };
        item[value.name] = name.value;
        this.setState({ item });
    }

    newItem = () => {
        this.setState({ item: {}, navigationDtl: { first: true, last: true }, stocks: [] });
    }

    saveItem = (message) => {
        console.log("Post: Object sent: ", this.state.item);
        axios.post('http://localhost:8089/item/save', this.state.item)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks });
                toast.success(message);
            })
            .catch(err => {
                console.log(err);
                toast.error("There is an error:\n" + err);
            });
    }

    deleteItem = () => {
        if (this.state.item.itemCode != null) {
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
        this.setState({
            itemAlert: false
        });
    }

    navigateItem(url) {
        axios.get(url)
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl, stocks: item.itemStocks })
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstItem = () => {
        this.navigateItem('http://localhost:8089/item/first');
    }

    previousItem = () => {
        this.navigateItem('http://localhost:8089/item/previous');
    }

    nextItem = () => {
        this.navigateItem('http://localhost:8089/item/next');
    }

    lastItem = () => {
        this.navigateItem('http://localhost:8089/item/last');
    }

    undoChanges = () => {
        if (this.state.item.itemCode != null) {
            console.log("Item Code: ", this.state.item.itemCode);
            let url = 'http://localhost:8089/item/' + this.state.item.itemCode;
            this.navigateItem(url);
        } else {
            this.lastItem();
        }
    }

    itemCategories() {
        let data = [];
        axios.get('http://localhost:8089/item/cats')
            .then(res => {
                console.log(res.data);
                res.data.forEach(element => {
                    data.push({ value: element, label: element });
                });
            })
            .catch(err => {
                console.log(err);
            });

        return data;
    }

    itemUOMs = () => {
        let data = [];
        axios.get('http://localhost:8089/item/uoms')
            .then(res => {
                console.log(res.data);
                res.data.forEach(element => {
                    data.push({ value: element, label: element });
                });
            })
            .catch(err => {
                console.log(err);
            });

        return data;
    }

    handleStockChange = (event, index) => {
        const { name, value } = event.target;
        let item = this.state.item;
        let stocks = this.state.stocks;
        console.log("Target name", name);
        console.log("Index: ", index);
        console.log("Value: ", value);
        console.log("Cell old value: ", stocks[index][name]);
        stocks[index][name] = value;
        item.stocks = stocks;
        this.setState({ item, stocks });
    }

    addStock = () => {
        let item = { ...this.state.item };
        let itemCode = item.itemCode;
        let newStock = { item: itemCode };
        let stocks = [...this.state.stocks];
        stocks.push(newStock);
        item.itemStocks = stocks;
        this.setState({ item, stocks });
    }

    deleteStock = () => {
        let item = { ...this.state.item };
        let stocks = [...this.state.stocks];
        let id = stocks[this.state.stockIndex]["itemStockId"];
        if (id != null) {
            axios.delete('http://localhost:8089/stock/delete/' + id)
                .then(res => {
                    console.log("Delete: Response: ", res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        stocks.splice(this.state.stockIndex, 1);
        item.itemStocks = stocks;
        this.setState({ item, stocks, stockAlert: false });
    }


    render() {
        const { item, navigationDtl, stocks } = this.state;

        const cats = this.itemCategories();
        const uoms = this.itemUOMs();

        const inputGroupTextStyle = {
            width: "180px"
        }

        const stretchStyle = {
            flex: "1"
        }

        const smallButtonStyle = {
            width: "7%"
        }

        const largeButtonStyle = {
            width: "15%"
        }

        const inputDateStyle = {
            width: "15%"
        }

        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Item Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemCode"
                                placeholder="Item Code"
                                aria-label="Item Code"
                                readOnly
                                value={item.itemCode || ''}
                                onChange={this.handleItemChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Item Barcode</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemBarcode"
                                placeholder="Item Barcode"
                                aria-label="Item Barcode"
                                value={item.itemBarcode || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Item Desc.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="itemDesc"
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                value={item.itemDesc || ''}
                                required
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Item Category</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div style={stretchStyle}>
                                <Select
                                    name="itemCategory"
                                    placeholder="Select Item Category"
                                    aria-label="Item Category"
                                    value={{ value: item.itemCategory || '', label: item.itemCategory || '' }}
                                    onChange={(name, value) => this.handleSelectChange(name, value)}
                                    clearable={true}
                                    options={cats}
                                />
                            </div>

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Item U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div style={stretchStyle}>
                                <Select
                                    name="itemUom"
                                    placeholder="Select Item U.O.M"
                                    aria-label="Item U.O.M"
                                    value={{ value: item.itemUom || '', label: item.itemUom || '' }}
                                    onChange={(name, value) => this.handleSelectChange(name, value)}
                                    clearable={true}
                                    options={uoms}
                                />
                            </div>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Purchase Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="purchasePrice"
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                value={item.purchasePrice || ''}
                                onChange={this.handleItemChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Sale Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="salePrice"
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                value={item.salePrice || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Min. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="minStock"
                                placeholder="Min. Stock"
                                aria-label="Min. Stock"
                                value={item.minStock || ''}
                                onChange={this.handleItemChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Max. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="maxStock"
                                placeholder="Max. Stock"
                                aria-label="Max. Stock"
                                value={item.maxStock || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Effective Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveStartDate"
                                placeholder="Effective Start Date"
                                aria-label="Effective Start Date"
                                onSelect={this.handleItemChange}
                                value={item.effectiveStartDate != null ? item.effectiveStartDate.split("T")[0] : ''}
                                required
                                onChange={this.handleItemChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Effective End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveEndDate"
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                value={item.effectiveEndDate != null ? item.effectiveEndDate.split("T")[0] : ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.firstItem}
                                className="mr-1" style={smallButtonStyle}
                                active>First
                            </Button>

                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.previousItem}
                                className="mr-1" style={smallButtonStyle}
                                active>Previous
                            </Button>

                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.nextItem}
                                className="mr-1" style={smallButtonStyle}
                                active>Next
                            </Button>

                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.lastItem}
                                className="mr-1" style={smallButtonStyle}
                                active>Last
                            </Button>

                        </ButtonToolbar>

                        <ButtonToolbar className="ml-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.newItem}
                                className="mr-1" style={smallButtonStyle}
                                active>Add
                            </Button>

                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={() => this.setState({ itemAlert: true })}
                                className="mr-1" style={smallButtonStyle}
                                active>Delete
                            </Button>

                            <Button
                                variant="primary"
                                onClick={() => this.saveItem("Item saved successfully.")}
                                className="mr-1" style={smallButtonStyle}
                                active>Save
                            </Button>

                            <Button
                                variant="primary"
                                /* disabled={navigationDtl.last} */
                                onClick={this.undoChanges}
                                className="mr-1" style={smallButtonStyle}
                                active>Undo
                            </Button>

                            <SweetAlert
                                show={this.state.itemAlert}
                                warning
                                showCancel
                                confirmBtnText="Delete"
                                confirmBtnBsStyle="danger"
                                cancelBtnBsStyle="default"
                                title="Delete Confirmation"
                                Text="Are you sure you want to delete this item? It will also delete all stocks related to it."
                                onConfirm={() => this.deleteItem()}
                                onCancel={() => this.setState({ itemAlert: false })}
                            >
                                Delete Item
                                </SweetAlert>
                        </ButtonToolbar>
                    </Form>
                    <br />
                    <center><h2>Item Stocks</h2></center>
                    <Table
                        striped
                        bordered
                        hover
                        responsive>
                        <thead>
                            <ButtonGroup className="m-2">
                                <Button
                                    variant="primary"
                                    // disabled={navigationDtl.first}
                                    onClick={this.addStock}
                                    className="mr-1" style={largeButtonStyle}
                                    active>Add Stock
                                            </Button>

                                <Button
                                    variant="primary"
                                    // disabled={navigationDtl.first}
                                    onClick={() => { this.saveItem("Stock saved successfully.") }}
                                    className="mr-1" style={largeButtonStyle}
                                    active>Save Stock
                                            </Button>

                                <Button
                                    variant="primary"
                                    // disabled={navigationDtl.first}
                                    onClick={() => this.setState({ stockAlert: true })}
                                    className="mr-1" style={largeButtonStyle}
                                    active>Delete Stock
                                                    </Button>

                                <SweetAlert
                                    show={this.state.stockAlert}
                                    warning
                                    showCancel
                                    confirmBtnText="Delete"
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title="Delete Confirmation"
                                    Text="Are you sure you want to delete this stock?"
                                    onConfirm={() => this.deleteStock()}
                                    onCancel={() => this.setState({ stockAlert: false })}
                                >
                                    Delete Stock
                                                    </SweetAlert>
                            </ButtonGroup>

                            <tr>
                                <th style={inputDateStyle}>Stock Date</th>
                                <th style={inputDateStyle}>Quantity</th>
                                <th style={stretchStyle}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks && stocks.map((stock, index) => (
                                    <tr key={stock.itemStockId}
                                        onFocus={() => { this.setState({ stockIndex: index }) }}>
                                        <td>
                                            <FormControl
                                                type="date"
                                                name="itemStockDate"
                                                placeholder="Stock Date"
                                                aria-label="Stock Date"
                                                value={stock.itemStockDate != null ? stock.itemStockDate.split("T")[0] : ''}
                                                required
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="number"
                                                name="qnty"
                                                placeholder="Stock Quantity"
                                                aria-label="Stock Quantity"
                                                value={stock.qnty || ''}
                                                required
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="text"
                                                name="remarks"
                                                placeholder="Remarks"
                                                aria-label="Remarks"
                                                value={stock.remarks || ''}
                                                onChange={e => this.handleStockChange(e, index)}
                                            />
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