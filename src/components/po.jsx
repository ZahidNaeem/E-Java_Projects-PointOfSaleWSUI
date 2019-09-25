import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-widgets/dist/css/react-widgets.css'
import { Combobox } from 'react-widgets'
import Select from 'react-select'
class PO extends Component {

    state = {
        invoice: {},
        navigationDtl: {},
        invoiceDetails: [],
        invoiceAlert: false,
        invoiceDtlAlert: false,
        invoiceDtlIndex: null
    }

    componentDidMount() {
        this.firstInvoice();
    }

    handleInvoiceChange = (event) => {
        const { name, value } = event.target;
        console.log("Target name", name);
        console.log(value);
        let invoice = { ...this.state.invoice };
        invoice[name] = value;
        this.setState({ invoice });
    }

    handleSelectChange = (name, value) => {
        let item = { ...this.state.item };
        item[value.name] = name.value;
        this.setState({ item });
    }

    handleComboboxChange = (value, name) => {
        let invoice = { ...this.state.invoice };
        invoice[name] = value;
        this.setState({ invoice });
    }

    newInvoice = () => {
        this.setState({ invoice: {}, navigationDtl: { first: true, last: true }, invoiceDetails: [] });
    }

    saveInvoice = (message) => {
        if (this.state.invoice.invoiceDesc === undefined || this.state.invoice.invoiceDesc === null || this.state.invoice.invoiceDesc === '') {
            toast.error("Invoice Desc. is required field");
        } else if (this.state.invoice.invoiceUom === undefined || this.state.invoice.invoiceUom === null || this.state.invoice.invoiceUom === '') {
            toast.error("Invoice U.O.M is required field");
        } else if (this.state.invoice.effectiveStartDate === undefined || this.state.invoice.effectiveStartDate === null || this.state.invoice.effectiveStartDate === '') {
            toast.error("Eff. start date is required field");
        } else {
            console.log("Post: Object sent: ", this.state.invoice);
            axios.post('http://localhost:8089/invoice/po/save', this.state.invoice)
                .then(res => {
                    console.log("Post: Object received: ", res.data);
                    const { invoice, navigationDtl } = res.data;
                    this.setState({ invoice, navigationDtl, invoiceDetails: invoice.invoiceDtls });
                    toast.success(message);
                })
                .catch(err => {
                    console.log(err);
                    toast.error("There is an error:\n" + err);
                });
        }
    }

    deleteInvoice = () => {
        if (this.state.invoice.invoiceCode != null) {
            console.log("Delete: Invoice Code sent: ", this.state.invoice.invoiceCode);
            axios.delete('http://localhost:8089/invoice/po/delete/' + this.state.invoice.invoiceCode)
                .then(res => {
                    console.log("Delete: Response: ", res);
                    const { invoice, navigationDtl } = res.data;
                    this.setState({ invoice, navigationDtl, invoiceDetails: invoice.invoiceDtls })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            invoiceAlert: false
        });
    }

    navigateInvoice(url) {
        axios.get(url)
            .then(res => {
                const { invoice, navigationDtl } = res.data;
                this.setState({ invoice, navigationDtl, invoiceDetails: invoice.invoiceDtls })
                console.log(this.state.invoice);
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstInvoice = () => {
        this.navigateInvoice('http://localhost:8089/invoice/po/first');
    }

    previousInvoice = () => {
        this.navigateInvoice('http://localhost:8089/invoice/po/previous');
    }

    nextInvoice = () => {
        this.navigateInvoice('http://localhost:8089/invoice/po/next');
    }

    lastInvoice = () => {
        this.navigateInvoice('http://localhost:8089/invoice/po/last');
    }

    undoChanges = () => {
        if (this.state.invoice.invoiceCode != null) {
            console.log("Invoice Code: ", this.state.invoice.invoiceCode);
            let url = 'http://localhost:8089/invoice/po/' + this.state.invoice.invoiceCode;
            this.navigateInvoice(url);
        } else {
            this.lastInvoice();
        }
    }

    parties() {
        let data = [];
        axios.get('http://localhost:8089/party/all')
            .then(res => {
                res.data.forEach(element => {
                    data.push({
                        value: element.partyCode,
                        label: element.partyName
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });

        return data;
    }

    invoiceUOMs = () => {
        let data = [];
        axios.get('http://localhost:8089/invoice/po/uoms')
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
        let invoiceCode = invoice.invoiceCode;
        let newinvoiceDtl = { invoice: invoiceCode };
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
        const { invoice, navigationDtl, invoiceDetails } = this.state;

        const parties = this.parties();
        const uoms = this.invoiceUOMs();

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
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>PO No.</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="invNum"
                            placeholder="PO No."
                            aria-label="PO No."
                            readOnly
                            value={invoice.invNum || ''}
                            onChange={this.handleInvoiceChange}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Invoice Barcode</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="invoiceBarcode"
                            placeholder="Invoice Barcode"
                            aria-label="Invoice Barcode"
                            value={invoice.invoiceBarcode || ''}
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Invoice Desc.</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="invoiceDesc"
                            placeholder="Invoice Desc."
                            aria-label="Invoice Desc."
                            value={invoice.invoiceDesc || ''}
                            required
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Party</InputGroup.Text>
                        </InputGroup.Prepend>
                        <div style={stretchStyle}>
                            {/* <Combobox
                            style={stretchStyle}
                            name="party"
                            placeholder="Select Party"
                            aria-label="party"
                            data={parties}
                            value={invoice.party || ''}
                            onChange={(name) => this.handleComboboxChange(name, "Party")}
                        /> */}
                            <Select
                                name="party"
                                placeholder="Select Party"
                                aria-label="Select Party"
                                selected={{ value: parties.value || '', label: parties.label || '' }}
                                onChange={(name, value) => this.handleSelectChange(name, value)}
                                clearable={true}
                                options={parties}
                            />
                        </div>

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Invoice U.O.M</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Combobox
                            style={stretchStyle}
                            name="invoiceUom"
                            placeholder="Select Invoice U.O.M"
                            aria-label="Invoice U.O.M"
                            data={uoms}
                            value={invoice.invoiceUom || ''}
                            onChange={(name) => this.handleComboboxChange(name, "invoiceUom")}
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
                            value={invoice.purchasePrice || ''}
                            onChange={this.handleInvoiceChange}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Sale Price</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            name="salePrice"
                            placeholder="Sale Price"
                            aria-label="Sale Price"
                            value={invoice.salePrice || ''}
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Min. InvoiceDetail</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            name="mininvoiceDtl"
                            placeholder="Min. InvoiceDetail"
                            aria-label="Min. InvoiceDetail"
                            value={invoice.mininvoiceDtl || ''}
                            onChange={this.handleInvoiceChange}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Max. InvoiceDetail</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            name="maxinvoiceDtl"
                            placeholder="Max. InvoiceDetail"
                            aria-label="Max. InvoiceDetail"
                            value={invoice.maxinvoiceDtl || ''}
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>PO Date</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="date"
                            name="invDate"
                            placeholder="PO Date"
                            aria-label="PO Date"
                            onSelect={this.handleInvoiceChange}
                            value={invoice.invDate != null ? invoice.invDate.split("T")[0] : ''}
                            required
                            onChange={this.handleInvoiceChange}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Effective End Date</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="date"
                            name="effectiveEndDate"
                            placeholder="Effective End Date"
                            aria-label="Effective End Date"
                            value={invoice.effectiveEndDate != null ? invoice.effectiveEndDate.split("T")[0] : ''}
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <ButtonToolbar className="m-2">
                        <Button
                            variant="primary"
                            disabled={navigationDtl.first}
                            onClick={this.firstInvoice}
                            className="mr-1" style={smallButtonStyle}
                            active>First
                            </Button>

                        <Button
                            variant="primary"
                            disabled={navigationDtl.first}
                            onClick={this.previousInvoice}
                            className="mr-1" style={smallButtonStyle}
                            active>Previous
                            </Button>

                        <Button
                            variant="primary"
                            disabled={navigationDtl.last}
                            onClick={this.nextInvoice}
                            className="mr-1" style={smallButtonStyle}
                            active>Next
                            </Button>

                        <Button
                            variant="primary"
                            disabled={navigationDtl.last}
                            onClick={this.lastInvoice}
                            className="mr-1" style={smallButtonStyle}
                            active>Last
                            </Button>

                    </ButtonToolbar>

                    <ButtonToolbar className="ml-2">
                        <Button
                            variant="primary"
                            // disabled={navigationDtl.first}
                            onClick={this.newInvoice}
                            className="mr-1" style={smallButtonStyle}
                            active>Add
                            </Button>

                        <Button
                            variant="primary"
                            // disabled={navigationDtl.first}
                            onClick={() => this.setState({ invoiceAlert: true })}
                            className="mr-1" style={smallButtonStyle}
                            active>Delete
                            </Button>

                        <Button
                            variant="primary"
                            onClick={() => this.saveInvoice("Invoice saved successfully.")}
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
                            show={this.state.invoiceAlert}
                            warning
                            showCancel
                            confirmBtnText="Delete"
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="default"
                            title="Delete Confirmation"
                            Text="Are you sure you want to delete this invoice? It will also delete all invoice details related to it."
                            onConfirm={() => this.deleteInvoice()}
                            onCancel={() => this.setState({ invoiceAlert: false })}
                        >
                            Delete Invoice
                                </SweetAlert>
                    </ButtonToolbar>

                    <br />
                    <h3 className="text-center h3 mb-4 text-gray-800">Invoice Details</h3>
                    <ButtonToolbar className="m-2">
                        <Button
                            variant="primary"
                            // disabled={navigationDtl.first}
                            onClick={this.addinvoiceDtl}
                            className="mr-1" style={largeButtonStyle}
                            active>Add InvoiceDetail
                        </Button>

                        <Button
                            variant="primary"
                            // disabled={navigationDtl.first}
                            onClick={() => { this.saveInvoice("InvoiceDetail saved successfully.") }}
                            className="mr-1" style={largeButtonStyle}
                            active>Save InvoiceDetail
                                            </Button>

                        <Button
                            variant="primary"
                            // disabled={navigationDtl.first}
                            onClick={() => this.setState({ invoiceDtlAlert: true })}
                            className="mr-1" style={largeButtonStyle}
                            active>Delete InvoiceDetail
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
                            Delete InvoiceDetail
                                                    </SweetAlert>
                    </ButtonToolbar>
                    <Table
                        striped
                        bordered
                        hover
                        responsive>
                        <thead>

                            <tr>
                                <th style={inputDateStyle}>InvoiceDetail Date</th>
                                <th style={inputDateStyle}>Quantity</th>
                                <th style={stretchStyle}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoiceDetails && invoiceDetails.map((invoiceDetail, index) => (
                                    <tr key={invoiceDetail.invoiceinvoiceDtlId}
                                        onFocus={() => { this.setState({ invoiceDtlIndex: index }) }}>
                                        <td>
                                            <FormControl
                                                type="date"
                                                name="invoiceinvoiceDtlDate"
                                                placeholder="InvoiceDetail Date"
                                                aria-label="InvoiceDetail Date"
                                                value={invoiceDetail.invoiceinvoiceDtlDate != null ? invoiceDetail.invoiceinvoiceDtlDate.split("T")[0] : ''}
                                                required
                                                onChange={e => this.handleinvoiceDtlChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="number"
                                                name="qnty"
                                                placeholder="InvoiceDetail Quantity"
                                                aria-label="InvoiceDetail Quantity"
                                                value={invoiceDetail.qnty || ''}
                                                required
                                                onChange={e => this.handleinvoiceDtlChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="text"
                                                name="remarks"
                                                placeholder="Remarks"
                                                aria-label="Remarks"
                                                value={invoiceDetail.remarks || ''}
                                                onChange={e => this.handleinvoiceDtlChange(e, index)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Form>
            </>
        );
    }
}

export default PO;