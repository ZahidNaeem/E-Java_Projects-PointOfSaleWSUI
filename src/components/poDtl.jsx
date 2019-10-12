import React, { Component } from 'react';
import { FormControl, Button, ButtonToolbar, Table } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import 'react-toastify/dist/ReactToastify.css'
import 'react-widgets/dist/css/react-widgets.css'
import Select from 'react-select'
class PoDtl extends Component {
    state = {
        invoiceDetails: [],
        items: [],
        invoiceDtlAlert: false,
        invoiceDtlIndex: 0
    }

    async componentDidMount() {
        await this.populateItems();
    }

    componentWillReceiveProps(props) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (props.invoiceDetails !== this.state.invoiceDetails) {
            this.setState({ invoiceDetails: props.invoiceDetails });
        }
    }

    handleInvoiceDetailsSelectChange = (name, value) => {
        console.log("handleInvoiceDetailsSelectChange start");

        let invoiceDetails = { ...this.state.invoiceDetails };
        invoiceDetails[this.state.invoiceDtlIndex][value.name] = name.value;
        this.setState({ invoiceDetails });
        console.log("handleInvoiceDetailsSelectChange end");
    }

    handleInvoiceDetailsComboboxChange = (value, name) => {
        let invoiceDetails = { ...this.state.invoiceDetails };
        invoiceDetails[this.state.invoiceDtlIndex][name] = value;
        this.setState({ invoiceDetails });
    }

    async populateItems() {
        let items = [];
        const res = await axios.get('http://localhost:8089/item/all');
        res.data.forEach(element => {
            items.push({
                value: element.itemCode,
                label: element.itemDesc,
                uom: element.itemUom
            });
        });

        this.setState({ items });
        console.log("Items: ", items);

    }

    populateItemDesc(itemCode) {
        console.log("populateItemDesc start");
        console.log("Item Code:", itemCode);

        let items = [...this.state.items];
        const result = items.filter(item => item.value === itemCode);
        if (result[0] !== undefined) {
            return result[0].label;
        }
    }

    handleinvoiceDtlChange = (event, index) => {
        const { name, value } = event.target;
        let invoice = this.state.invoice;
        let invoiceDetails = this.state.invoiceDetails;
        console.log("Target name", name);
        console.log("Index: ", index);
        console.log("Value: ", value);
        console.log("Cell old value: ", invoiceDetails[index][name]);
        invoiceDetails[index][name] = value;
        invoice.invoiceDetails = invoiceDetails;
        this.setState({ invoice, invoiceDetails });
    }

    addinvoiceDtl = () => {
        let invoice = { ...this.state.invoice };
        let newinvoiceDtl = {};
        let invoiceDetails = [...this.state.invoiceDetails];
        invoiceDetails.push(newinvoiceDtl);
        invoice.invoiceDtls = invoiceDetails;
        this.setState({ invoice, invoiceDetails });
    }

    deleteinvoiceDtl = () => {
        let invoice = { ...this.state.invoice };
        let invoiceDetails = [...this.state.invoiceDetails];
        let id = invoiceDetails[this.state.invoiceDtlIndex]["invoiceinvoiceDtlId"];
        if (id != null) {
            axios.delete('http://localhost:8089/invoiceDetail/delete/' + id)
                .then(res => {
                    console.log("Delete: Response: ", res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        invoiceDetails.splice(this.state.invoiceDtlIndex, 1);
        invoice.invoiceDtls = invoiceDetails;
        this.setState({ invoice, invoiceDetails, invoiceDtlAlert: false });
    }


    render() {
        const { invoiceDetails, items, invoiceDtlIndex } = this.state;

        // const itemDesc = this.populateItemDesc(invoiceDetails[invoiceDtlIndex]);


        const stretchStyle = {
            flex: "1"
        }


        const largeButtonStyle = {
            width: "15%"
        }

        const inputDateStyle = {
            width: "15%"
        }

        return (
            <>
                <h3 className="text-center h3 mb-4 text-gray-800">Invoice Details</h3>
                <ButtonToolbar className="m-2">
                    <Button
                        variant="primary"
                        // disabled={navigationDtl.first}
                        onClick={this.addinvoiceDtl}
                        className="mr-1" style={largeButtonStyle}
                        active>Add Detail
                        </Button>

                    <Button
                        variant="primary"
                        // disabled={navigationDtl.first}
                        onClick={() => { this.saveInvoice("InvoiceDetail saved successfully.") }}
                        className="mr-1" style={largeButtonStyle}
                        active>Save Detail
                                            </Button>

                    <Button
                        variant="primary"
                        // disabled={navigationDtl.first}
                        onClick={() => this.setState({ invoiceDtlAlert: true })}
                        className="mr-1" style={largeButtonStyle}
                        active>Delete Detail
                                                    </Button>

                    <SweetAlert
                        show={this.state.invoiceDtlAlert}
                        warning
                        showCancel
                        confirmBtnText="Delete"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Delete Confirmation"
                        Text="Are you sure you want to delete this invoiceDetail?"
                        onConfirm={() => this.deleteinvoiceDtl()}
                        onCancel={() => this.setState({ invoiceDtlAlert: false })}
                    >
                        Delete Invoice Detail
                                                    </SweetAlert>
                </ButtonToolbar>
                <Table
                    striped
                    bordered
                    hover
                    responsive>
                    <thead>

                        <tr>
                            <th style={inputDateStyle}>Item</th>
                            <th style={stretchStyle}>Price</th>
                            <th style={inputDateStyle}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoiceDetails && invoiceDetails.map((invoiceDetail, index) => (
                                <tr key={invoiceDetail.invoiceDtlId}
                                    /* onFocus={() => { this.setState({ invoiceDtlIndex: index }) }} */>
                                    <td>
                                        <div style={stretchStyle}>
                                            <Select
                                                name="item"
                                                placeholder="Select Item"
                                                aria-label="Select Item"
                                                value={{ value: invoiceDetail.item || '', label: this.populateItemDesc(invoiceDetail.item) || '' }}
                                                /* getOptionLabel={option => option.label}
                                                getOptionValue={option => option.value} */
                                                onChange={(name, value) => this.handleInvoiceDetailsSelectChange(name, value)}
                                                clearable={true}
                                                options={items}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="itemPrice"
                                            placeholder="Item Price"
                                            aria-label="Item Price"
                                            value={invoiceDetail.itemPrice || ''}
                                            required
                                            onChange={e => this.handleinvoiceDtlChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            name="qnty"
                                            placeholder="Quantity"
                                            aria-label="Quantity"
                                            value={invoiceDetail.qnty || ''}
                                            required
                                            onChange={e => this.handleinvoiceDtlChange(e, index)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </>
        );
    }
}

export default PoDtl;