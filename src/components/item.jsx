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
        navigationDtl: {}
    }

    componentDidMount() {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl })
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

    /* handleSubmit = (event) => {
        let itemCode = this.state.item.itemCode;
        if (itemCode == null) {
            this.saveItem();
        } else {
            this.updateItem();
        }
    } */

    newItem = () => {
        this.setState({ item: {}, navigationDtl: { first: true, last: true } });
    }

    saveItem = () => {
        console.log("Post: Object sent: ", this.state.item);
        axios.post('http://localhost:8089/item', this.state.item)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
            })
            .catch(err => {
                console.log(err);
            });
    }

    /*   updateItem = () => {
          console.log("Put: Object sent: ", this.state.item);
          axios.put('http://localhost:8089/item', this.state.item)
              .then(res => {
                  console.log("Put: Object received: ", res)
              })
              .catch(err => {
                  console.log(err);
              });
      } */

    deleteItem = () => {
        console.log("Delete: Item Code sent: ", this.state.item.itemCode);
        axios.delete('http://localhost:8089/item/' + this.state.item.itemCode)
            .then(res => {
                console.log("Delete: Response: ", res);
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstItem = () => {
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl });
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
                this.setState({ item, navigationDtl });
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
                this.setState({ item, navigationDtl });
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
                this.setState({ item, navigationDtl });
                console.log(this.state.item);
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
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
                                value={this.state.item.itemCode || ''}
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
                                value={this.state.item.itemBarcode || ''}
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
                                value={this.state.item.itemDesc || ''}
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
                                value={this.state.item.itemCategory || ''}
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
                                value={this.state.item.itemUom || ''}
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
                                value={this.state.item.purchasePrice || ''}
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
                                value={this.state.item.salePrice || ''}
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
                                value={this.state.item.maxStock || ''}
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
                                value={this.state.item.minStock || ''}
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
                                value={this.state.item.effectiveStartDate || ''}
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
                                value={this.state.item.effectiveEndDate || ''}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>
                        <ButtonToolbar>
                            <Button
                                variant="primary" size="lg"
                                disabled={this.state.navigationDtl.first}
                                onClick={this.firstItem}
                                active>First
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                disabled={this.state.navigationDtl.first}
                                onClick={this.previousItem}
                                active>Previous
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                disabled={this.state.navigationDtl.last}
                                onClick={this.nextItem}
                                active>Next
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                disabled={this.state.navigationDtl.last}
                                onClick={this.lastItem}
                                active>Last
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar>
                            <Button
                                variant="primary" size="lg"
                                // disabled={this.state.navigationDtl.first}
                                onClick={this.newItem}
                                active>add
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                // disabled={this.state.navigationDtl.first}
                                onClick={this.deleteItem}
                                active>Delete
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                onClick={this.saveItem}
                                active>Save
                            </Button>
                            <Button
                                variant="primary" size="lg"
                                /* disabled={this.state.navigationDtl.last}
                                onClick={this.nextItem} */
                                active>Undo
                            </Button>
                        </ButtonToolbar>
                    </Form>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Stock Date</th>
                                <th>Quantity</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.item.itemStocks && this.state.item.itemStocks.map((stock) => (
                                    // <li key={stock.itemStockId}>
                                        <tr>
                                            <td>{stock.itemStockDate}</td>
                                            <td>{stock.qnty}</td>
                                            <td>{stock.remarks}</td>
                                        </tr>
                                    // </li>
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