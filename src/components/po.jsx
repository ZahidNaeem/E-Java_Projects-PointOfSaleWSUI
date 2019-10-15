import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, Form } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-widgets/dist/css/react-widgets.css'
import Select from 'react-select'
import PoDtl from './poDtl'
class PO extends Component {

    state = {
        invoice: {},
        navigationDtl: {},
        parties: [],
        partyName: "",
        invoiceAlert: false
    }

    async componentDidMount() {
        await this.populateParties();
        this.firstInvoice();
    }

    async populateParties() {
        console.log("Start populate parties");

        let parties = [];
        const res = await axios.get('http://localhost:8089/party/all');
        console.log("Stop populate parties");
        res.data.forEach(element => {
            parties.push({
                value: element.partyCode,
                label: element.partyName
            });
        });
        this.setState({ parties });
    }

    populatePartyName = (partyCode) => {
        console.log("populatePartyName called");
        console.log("Party Code: ", partyCode);

        let parties = [...this.state.parties];

        const result = parties.filter(party => party.value === partyCode);
        if (result[0] !== undefined) {
            let partyName = result[0].label;
            this.setState({ partyName });
        }

    }

    async navigateInvoice(url) {
        const res = await axios.get(url);
        const { invoice, navigationDtl } = res.data;
        this.populatePartyName(invoice.party);
        this.setState({ invoice, navigationDtl });
    }

    handleInvoiceChange = (event) => {
        const { name, value } = event.target;
        console.log("Target name", name);
        console.log(value);
        let invoice = { ...this.state.invoice };
        invoice[name] = value;
        this.setState({ invoice });
    }

    handleInvoiceSelectChange = (name, value) => {
        let invoice = { ...this.state.invoice };
        invoice[value.name] = name.value;
        this.setState({ invoice });
        this.populatePartyName(invoice.party);
    }

    handleInvoiceComboboxChange = (value, name) => {
        let invoice = { ...this.state.invoice };
        invoice[name] = value;
        this.setState({ invoice });
    }

    newInvoice = () => {
        const invoice = {invType: 'PO'};
        invoice.invoiceDtls = [];
        this.setState({ invoice, navigationDtl: { first: true, last: true } });
    }

    saveInvoice = async (message) => {
        if (this.state.invoice.invDate === undefined || this.state.invoice.invDate === null || this.state.invoice.invDate === '') {
            toast.error("PO date is required field");
        } else if (this.state.invoice.party === undefined || this.state.invoice.party === null || this.state.invoice.party === '') {
            toast.error("Party is required field");
        } else {
            console.log("Post: Object sent: ", this.state.invoice);
            const res = await axios.post('http://localhost:8089/invoice/po/save', this.state.invoice);
            console.log("Post: Object received: ", res.data);
            const { invoice, navigationDtl } = res.data;
            this.setState({ invoice, navigationDtl, invoiceDetails: invoice.invoiceDtls });
            toast.success(message);
        }
    }

    deleteInvoice = async () => {
        if (this.state.invoice.invoiceCode != null) {
            console.log("Delete: Invoice Code sent: ", this.state.invoice.invoiceCode);
            const res = await axios.delete('http://localhost:8089/invoice/po/delete/' + this.state.invoice.invoiceCode)
            console.log("Delete: Response: ", res);
            const { invoice, navigationDtl } = res.data;
            this.setState({ invoice, navigationDtl, invoiceDetails: invoice.invoiceDtls });
        }
        this.setState({
            invoiceAlert: false
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

    addDetailsIntoInvoice = (details) => {
        let invoice = { ...this.state.invoice };
        invoice.invoiceDtls = details;
        this.setState({ invoice });
    }

    render() {
        const { invoice, navigationDtl, parties, partyName } = this.state;


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
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Party</InputGroup.Text>
                        </InputGroup.Prepend>
                        <div style={stretchStyle}>
                            <Select
                                name="party"
                                placeholder="Select Party"
                                aria-label="Select Party"
                                value={{ value: invoice.party || '', label: partyName || '' }}
                                /* getOptionLabel={option => option.label}
                                getOptionValue={option => option.value} */
                                onChange={(name, value) => this.handleInvoiceSelectChange(name, value)}
                                clearable={true}
                                options={parties}
                            />
                        </div>
                    </InputGroup>


                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Advance Paid</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            name="paidAmt"
                            placeholder="Paid Amount"
                            aria-label="Paid Amount"
                            value={invoice.paidAmt || ''}
                            onChange={this.handleInvoiceChange}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={inputGroupTextStyle}>Remarks</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as="textarea"
                            rows="3"
                            name="remarks"
                            placeholder="Remarks"
                            aria-label="Remarks"
                            value={invoice.remarks || ''}
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

                    <PoDtl invoice={invoice} addDetailsIntoInvoice={this.addDetailsIntoInvoice} saveInvoice={this.saveInvoice} />
                </Form>
            </>
        );
    }
}

export default PO;