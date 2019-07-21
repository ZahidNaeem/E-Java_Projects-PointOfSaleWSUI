import React from 'react'
import 'react-bootstrap'

const Items = ({ items: items }) => {
    return (
        <div>
            <center><h1>Item Registrtion Form</h1></center>
            {items.map((item) => (
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Item Desc.</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Item Desc."
                            aria-label="Item Desc."
                            aria-describedby="basic-addon1"
                            value={item.itemDesc}
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
                            value={item.itemUom}
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
                </div>
            ))}
        </div>
    )
};

export default Items