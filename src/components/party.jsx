import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, Form } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-widgets/dist/css/react-widgets.css'
import { Combobox } from 'react-widgets'
import PartyBalance from './partyBalance'

class Party extends Component {

    state = {
        party: {},
        navigationDtl: {},
        partyAlert: false
    }

    componentDidMount() {
        this.firstParty();
    }

    handlePartyChange = (event) => {
        const { name, value } = event.target;
        console.log("Target name", name);
        console.log(value);
        let party = { ...this.state.party };
        party[name] = value;
        this.setState({ party });
    }

    handleComboboxChange = (value, name) => {
        let party = { ...this.state.party };
        party[name] = value;
        this.setState({ party });
    }

    newParty = () => {
        this.setState({ party: {}, navigationDtl: { first: true, last: true } });
    }

    saveParty = (message) => {
        console.log("Post: Object sent: ", this.state.party);
        axios.post('http://localhost:8089/api/party/save', this.state.party)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl });
                toast.success(message);
            })
            .catch(err => {
                console.log(err);
                toast.error("There is an error:\n" + err);
            });
    }

    deleteParty = () => {
        if (this.state.party.partyCode != null) {
            console.log("Delete: Party Code sent: ", this.state.party.partyCode);
            axios.delete('http://localhost:8089/api/party/delete/' + this.state.party.partyCode)
                .then(res => {
                    console.log("Delete: Response: ", res);
                    const { party, navigationDtl } = res.data;
                    this.setState({ party, navigationDtl })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            partyAlert: false
        });
    }

    navigateParty(url) {
        axios.get(url)
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl })
                console.log(this.state.party);
            })
            .catch(err => {
                console.log(err);
            });
    }

    firstParty = () => {
        this.navigateParty('http://localhost:8089/api/party/first');
    }

    previousParty = () => {
        this.navigateParty('http://localhost:8089/api/party/previous');
    }

    nextParty = () => {
        this.navigateParty('http://localhost:8089/api/party/next');
    }

    lastParty = () => {
        this.navigateParty('http://localhost:8089/api/party/last');
    }

    undoChanges = () => {
        if (this.state.party.partyCode != null) {
            console.log("Party Code: ", this.state.party.partyCode);
            let url = 'http://localhost:8089/api/party/' + this.state.party.partyCode;
            this.navigateParty(url);
        } else {
            this.firstParty();
        }
    }

    addBalanceIntoParty = (balances) => {
        let party = { ...this.state.party };
        party.partyBalances = balances;
        this.setState({ party });
    }


    render() {
        const { party, navigationDtl } = this.state;

        const partyTypes = ['Supplier', 'Buyer'];

        const inputGroupTextStyle = {
            width: "180px"
        }

        const stretchStyle = {
            flex: "1"
        }

        const smallButtonStyle = {
            width: "80px"
        }

        return (
            <>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Party Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyCode"
                                placeholder="Party Code"
                                aria-label="Party Code"
                                readOnly
                                value={party.partyCode || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Party Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyName"
                                placeholder="Party Name"
                                aria-label="Party Name"
                                value={party.partyName || ''}
                                required
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Party Owner</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyOwner"
                                placeholder="Party Owner"
                                aria-label="Party Owner"
                                value={party.partyOwner || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Party Type</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Combobox
                                style={stretchStyle}
                                name="partyType"
                                placeholder="Select Party Type"
                                aria-label="Party Type"
                                data={partyTypes}
                                value={party.partyType || ''}
                                onChange={(name) => this.handleComboboxChange(name, "partyType")}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Contact Person</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="contactPerson"
                                placeholder="Contact Person"
                                aria-label="Contact Person"
                                value={party.contactPerson || ''}
                                required
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Cell #</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="cellNo"
                                placeholder="Cell #"
                                aria-label="Cell #"
                                value={party.cellNo || ''}
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Phone</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="phone"
                                placeholder="Phone"
                                aria-label="Phone"
                                value={party.phone || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Fax</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="fax"
                                placeholder="Fax"
                                aria-label="Fax"
                                value={party.fax || ''}
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="address"
                                placeholder="Address"
                                aria-label="Address"
                                value={party.address || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>E-mail</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="email"
                                placeholder="E-mail"
                                aria-label="E-mail"
                                value={party.email || ''}
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Web</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="web"
                                placeholder="Web"
                                aria-label="Web"
                                value={party.web || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>N.T.N</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="ntn"
                                placeholder="N.T.N"
                                aria-label="N.T.N"
                                value={party.ntn || ''}
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>S.T.R.N</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="strn"
                                placeholder="S.T.R.N"
                                aria-label="S.T.R.N"
                                value={party.strn || ''}
                                onChange={this.handlePartyChange}
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
                                onSelect={this.handlePartyChange}
                                value={party.effectiveStartDate != null ? party.effectiveStartDate.split("T")[0] : ''}
                                required
                                onChange={this.handlePartyChange}
                            />

                            <InputGroup.Prepend>
                                <InputGroup.Text style={inputGroupTextStyle}>Effective End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="date"
                                name="effectiveEndDate"
                                placeholder="Effective End Date"
                                aria-label="Effective End Date"
                                value={party.effectiveEndDate != null ? party.effectiveEndDate.split("T")[0] : ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <ButtonToolbar className="m-2">
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.firstParty}
                                className="mr-1" style={smallButtonStyle}
                                active>First
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.previousParty}
                                className="mr-1" style={smallButtonStyle}
                                active>Previous
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.nextParty}
                                className="mr-1" style={smallButtonStyle}
                                active>Next
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.lastParty}
                                className="mr-1" style={smallButtonStyle}
                                active>Last
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar className="ml-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.newParty}
                                className="mr-1" style={smallButtonStyle}
                                active>Add
                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={() => this.setState({ partyAlert: true })}
                                className="mr-1" style={smallButtonStyle}
                                active>Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => this.saveParty("Party saved successfully.")}
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
                                show={this.state.partyAlert}
                                warning
                                showCancel
                                confirmBtnText="Delete"
                                confirmBtnBsStyle="danger"
                                cancelBtnBsStyle="default"
                                title="Delete Confirmation"
                                Text="Are you sure you want to delete this party? It will also delete all balances related to it."
                                onConfirm={() => this.deleteParty()}
                                onCancel={() => this.setState({ partyAlert: false })}
                            >
                                Delete Party
                                </SweetAlert>
                        </ButtonToolbar>

                        <br />
                        <PartyBalance party={party} addBalanceIntoParty={this.addBalanceIntoParty} />
                    </Form>
                </div>
            </>
        );
    }
}

export default Party;