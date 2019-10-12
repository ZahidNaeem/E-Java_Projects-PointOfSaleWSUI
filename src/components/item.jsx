import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, Form } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-widgets/dist/css/react-widgets.css'
import { Combobox } from 'react-widgets'
import ItemStock from './itemStock'
class Item extends Component {

    state = {
        item: {},
        navigationDtl: {},
        itemAlert: false
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

    handleComboboxChange = (value, name) => {
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    newItem = () => {
        const item = {};
        item.itemStocks = [];
        this.setState({ item, navigationDtl: { first: true, last: true } });
    }

    saveItem = (message) => {
        if (this.state.item.itemDesc === undefined || this.state.item.itemDesc === null || this.state.item.itemDesc === '') {
            toast.error("Item Desc. is required field");
        } else if (this.state.item.itemUom === undefined || this.state.item.itemUom === null || this.state.item.itemUom === '') {
            toast.error("Item U.O.M is required field");
        } else if (this.state.item.effectiveStartDate === undefined || this.state.item.effectiveStartDate === null || this.state.item.effectiveStartDate === '') {
            toast.error("Eff. start date is required field");
        } else {
            console.log("Post: Object sent: ", this.state.item);
            axios.post('http://localhost:8089/item/save', this.state.item)
                .then(res => {
                    console.log("Post: Object received: ", res.data);
                    const { item, navigationDtl } = res.data;
                    this.setState({ item, navigationDtl });
                    toast.success(message);
                })
                .catch(err => {
                    console.log(err);
                    toast.error("There is an error:\n" + err);
                });
        }
    }

    deleteItem = () => {
        if (this.state.item.itemCode != null) {
            console.log("Delete: Item Code sent: ", this.state.item.itemCode);
            axios.delete('http://localhost:8089/item/delete/' + this.state.item.itemCode)
                .then(res => {
                    console.log("Delete: Response: ", res);
                    const { item, navigationDtl } = res.data;
                    this.setState({ item, navigationDtl })
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
                this.setState({ item, navigationDtl })
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
                res.data.forEach(element => {
                    data.push(element);
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
                res.data.forEach(element => {
                    data.push(element);
                });
            })
            .catch(err => {
                console.log(err);
            });

        return data;
    }

    addStockIntoItem = (stocks) => {
        let item = { ...this.state.item };
        item.itemStocks = stocks;
        this.setState({ item });
    }

    render() {
        const { item, navigationDtl } = this.state;

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

        return (
            <>
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
                        <Combobox
                            style={stretchStyle}
                            name="itemCategory"
                            placeholder="Select Item Category"
                            aria-label="Item Category"
                            data={cats}
                            value={item.itemCategory || ''}
                            onChange={(name) => this.handleComboboxChange(name, "itemCategory")}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Item U.O.M</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Combobox
                            style={stretchStyle}
                            name="itemUom"
                            placeholder="Select Item U.O.M"
                            aria-label="Item U.O.M"
                            data={uoms}
                            value={item.itemUom || ''}
                            onChange={(name) => this.handleComboboxChange(name, "itemUom")}
                        />
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
                    <ItemStock item={item} saveItem={() => this.saveItem("Item saved successfully.")} addStockIntoItem={this.addStockIntoItem} />
                </Form>
            </>
        );
    }
}

export default Item;