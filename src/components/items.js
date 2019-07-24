import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { itemDesc: '', itemUom: '' },
            navigation: {}
        };
        this.handleItemDescChange = this.handleItemDescChange.bind(this);
        this.handleItemUomChange = this.handleItemUomChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleItemDescChange(event) {
        console.log(event.target.value);
        this.setState({ itemDesc: event.target.value });
    }

    handleItemUomChange(event) {
        console.log(event.target.value);
        this.setState({ itemUom: event.target.value });
    }

    handleSubmit(event) {
        alert('An Item was submitted: ' + this.state.itemDesc);
        event.preventDefault();
    }

    componentDidMount() {
        fetch('http://localhost:8089/item/first')
            .then(res => res.json())
            .then((data) => {
                this.setState({ item: data.item, navigation: data.navigationDtl })
            })
            .catch(console.log)
    }

    render() {
        let obj = this.state.item;
        return (
            < div >
                <center><h1>Item Registrtion Form</h1></center>
                <div>
                    <form onSubmit={this.handleSubmit}>
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
                    </form>
                </div>
            </div >
        );
    }
}

export default Item;