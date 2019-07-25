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
            fetch('http://localhost:8089/item/first')
                .then(res => res.json())
                .then((data) => {
                    const {item, navigationDtl} = data;
                    this.setState({ item, navigationDtl })
                })
                .catch(console.log)
        }

    handleItemDescChange = (event) => {
        console.log(event.target.value);
        //let item = this.state.item;
        this.setState({ itemDesc: event.target.value });
    }

    handleItemUomChange = (event) => {
        console.log(event.target.value);
        let item = {itemUom: event.target.value}
        this.setState({ item });
    }

    handleSubmit = (event) => {
        alert('An Item was submitted: ' + this.state.item.itemDesc);
        event.preventDefault();
    }


    render() {
        return (
            <>
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Item Desc.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item Desc."
                                aria-label="Item Desc."
                                aria-describedby="basic-addon1"
                                defaultValue={obj.itemDesc}
                                onChange={this.handleItemDescChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Item U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Item U.O.M"
                                aria-label="Item U.O.M"
                                aria-describedby="basic-addon2"
                                defaultValue={obj.itemUom}
                                onChange={this.handleItemUomChange}
                            />
                            {/* <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                            </InputGroup.Append> */}
                        </InputGroup>

                        <label htmlFor="basic-url">Your vanity URL</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3">
                                    https://example.com/users/
                        </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>With textarea</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" />
                        </InputGroup>
                        <Button type="submit" variant="primary" size="lg" block active>Submit</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default Item;