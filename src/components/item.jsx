import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Item extends Component {

    state = {
        item: {},
        navigationDtl: {}
    }

    componentDidMount() {
        const axios = require('axios');
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl })
            })
            .catch(console.log)
    }

    handleItemChange = (event) => {
        console.log(event.target.value);
        let item = this.state.item;
        item[event.target.name] = event.target.value;
        this.setState({ item });
    }

    handleSubmit = (event) => {
        event.preventDefault();

    }


    render() {
        let obj = this.state.item;
        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item Code"
                                aria-label="Item Code"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.itemCode}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Item Barcode</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item Barcode"
                                aria-label="Item Barcode"
                                aria-describedby="basic-addon2"
                                defaultValue={obj.itemBarcode}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Desc.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                aria-describedby="basic-addon1"
                                defaultValue={obj.itemDesc}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Category</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item Category"
                                aria-label="Item Category"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.itemCategory}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item U.O.M"
                                aria-label="Item U.O.M"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.itemUom}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Purchase Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.purchasePrice}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Sale Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.salePrice}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Max. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Max. Stock"
                                aria-label="Max. Stock"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.maxStock}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Min. Stock</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Min. Stock"
                                aria-label="Min. Stock"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.minStock}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Effective Start Date"
                                aria-label="Effective Start Date"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.effectiveStartDate}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Effective End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                aria-describedby="basic-addon1"
                                defaultValue={obj.effectiveEndDate}
                                onChange={this.handleItemChange}
                            />
                        </InputGroup>
                        <Button type="submit" variant="primary" size="lg" block active>Submit</Button>
                    </Form>
                </div>
            </>
        );
    }
    /*
import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Item extends Component {

    state = {
        item: {},
        navigationDtl: {}
    }

    componentDidMount() {
        const axios = require('axios');
        axios.get('http://localhost:8089/item/first')
            .then(res => {
                const { item, navigationDtl } = res.data;
                this.setState({ item, navigationDtl })
            })
            .catch(console.log)
    }

    handleItemChange = (event) => {
        console.log(event.target.value);
        let item = this.state.item;
        item[event.target.name] = event.target.value;
        this.setState({ item });
    }

    handleSubmit = (event) => {
        event.preventDefault();

    }


    render() {
        let obj = this.state.item;
        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                        <Form.Group ><Form.Label>Item Code</Form.Label>
                            <FormControl
                                readOnly
                                plaintext
                                defaultValue={obj.itemCode}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Item Barcode</Form.Label>
                            <FormControl
                                placeholder="Item Barcode"
                                aria-label="Item Barcode"
                                aria-describedby="basic-addon2"
                                defaultValue={obj.itemBarcode}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Item Desc.</Form.Label>
                            <FormControl
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                defaultValue={obj.itemDesc}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>
                        </Form.Row>
                        <Form.Group ><Form.Label>Item Category</Form.Label>
                            <FormControl
                                placeholder="Item Category"
                                aria-label="Item Category"

                                defaultValue={obj.itemCategory}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Item U.O.M</Form.Label>
                            <FormControl
                                placeholder="Item U.O.M"
                                aria-label="Item U.O.M"
                                defaultValue={obj.itemUom}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Purchase Price</Form.Label>
                            <FormControl
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                defaultValue={obj.purchasePrice}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Sale Price</Form.Label>
                            <FormControl
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                defaultValue={obj.salePrice}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Min. Stock</Form.Label>
                            <FormControl
                                placeholder="Min. Stock"
                                aria-label="Min. Stock"
                                defaultValue={obj.minStock}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Max. Stock</Form.Label>
                            <FormControl
                                placeholder="Max. Stock"
                                aria-label="Max. Stock"
                                defaultValue={obj.maxStock}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Effective Start Date</Form.Label>
                            <FormControl
                                placeholder="Effective Start Date"
                                aria-label="Effective Start Date"
                                defaultValue={obj.effectiveStartDate}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Form.Group ><Form.Label>Effective End Date</Form.Label>
                            <FormControl
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                defaultValue={obj.effectiveEndDate}
                                onChange={this.handleItemChange}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" size="lg" block active>Submit</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default Item;
    */
}

export default Item;