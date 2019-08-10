import React, { Component } from 'react';
import { InputGroup, FormControl, Button, ButtonToolbar, ButtonGroup, Form, Table } from 'react-bootstrap'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from 'react-select'
class Party extends Component {

    state = {
        party: {},
        navigationDtl: {},
        balances: [],
        partyAlert: false,
        balanceAlert: false,
        balanceIndex: null
    }

    componentDidMount() {
        axios.get('http://localhost:8089/party/first')
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handlePartyChange = (event) => {
        const { name, value } = event.target;
        console.log("Target name", name);
        console.log(value);
        let party = { ...this.state.party };
        party[name] = value;
        this.setState({ party });
    }

    handleSelectChange = (name, value) => {
        let party = { ...this.state.party };
        party[value.name] = name.value;
        this.setState({ party });
    }

    newParty = () => {
        this.setState({ party: {}, navigationDtl: { first: true, last: true }, balances: [] });
    }

    saveParty = (message) => {
        console.log("Post: Object sent: ", this.state.party);
        axios.post('http://localhost:8089/party/save', this.state.party)
            .then(res => {
                console.log("Post: Object received: ", res.data);
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances });
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
            axios.delete('http://localhost:8089/party/delete/' + this.state.party.partyCode)
                .then(res => {
                    console.log("Delete: Response: ", res);
                    const { party, navigationDtl } = res.data;
                    this.setState({ party, navigationDtl, balances: party.partyBalances })
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            partyAlert: false
        });
    }

    firstParty = () => {
        axios.get('http://localhost:8089/party/first')
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances })
                console.log(this.state.party);
            })
            .catch(err => {
                console.log(err);
            });
    }

    previousParty = () => {
        axios.get('http://localhost:8089/party/previous')
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances })
                console.log(this.state.party);
            })
            .catch(err => {
                console.log(err);
            });
    }

    nextParty = () => {
        axios.get('http://localhost:8089/party/next')
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances })
                console.log("Party: ", party);
                console.log("Balance: ", party.partyBalances);
            })
            .catch(err => {
                console.log(err);
            });
    }

    lastParty = () => {
        axios.get('http://localhost:8089/party/last')
            .then(res => {
                const { party, navigationDtl } = res.data;
                this.setState({ party, navigationDtl, balances: party.partyBalances })
                console.log(this.state.party);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleBalanceChange = (event, index) => {
        const { name, value } = event.target;
        let party = this.state.party;
        let balances = this.state.balances;
        console.log("Target name", name);
        console.log("Index: ", index);
        console.log("Value: ", value);
        console.log("Cell old value: ", balances[index][name]);
        balances[index][name] = value;
        party.balances = balances;
        this.setState({ party, balances });
    }

    addBalance = () => {
        let party = { ...this.state.party };
        let partyCode = party.partyCode;
        let newBalance = { party: partyCode };
        let balances = [...this.state.balances];
        balances.push(newBalance);
        party.partyBalances = balances;
        this.setState({ party, balances });
    }

    deleteBalance = () => {
        let party = { ...this.state.party };
        let balances = [...this.state.balances];
        let id = balances[this.state.balanceIndex]["partyBalanceId"];
        if (id != null) {
            axios.delete('http://localhost:8089/balance/delete/' + id)
                .then(res => {
                    console.log("Delete: Response: ", res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        balances.splice(this.state.balanceIndex, 1);
        party.partyBalances = balances;
        this.setState({ party, balances, balanceAlert: false });
    }


    render() {
        const { party, navigationDtl, balances } = this.state;
        const options = [
            { value: 'Supplier', label: 'Supplier' },
            { value: 'Buyer', label: 'Buyer' }
        ]
        return (
            <>
                <center><h1>Party Registrtion Form</h1></center>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Party Code</InputGroup.Text>
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
                                <InputGroup.Text style={{ width: "180px" }}>Party Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyName"
                                placeholder="Party Name"
                                aria-label="Party Name"
                                value={party.partyName || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Party Owner</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyOwner"
                                placeholder="Party Owner"
                                aria-label="Party Owner"
                                value={party.partyOwner || ''}
                                required
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Party Type</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div style={{ width: '200px' }}>
                                <Select
                                    name="partyType"
                                    value={{ value: party.partyType || '', label: party.partyType || '' }}
                                    placeholder='Select Party Type'
                                    onChange={(name, value) => this.handleSelectChange(name, value)}
                                    clearable={true}
                                    options={options}
                                />
                            </div>
                            {/* <FormControl
                                name="partyType"
                                placeholder="Party Type"
                                aria-label="Party Type"
                                value={party.partyType || ''}
                                onChange={this.handlePartyChange}
                            /> */}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Party U.O.M</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="partyUom"
                                placeholder="Party U.O.M"
                                aria-label="Party U.O.M"
                                value={party.partyUom || ''}
                                required
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Purchase Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="purchasePrice"
                                placeholder="Purchase Price"
                                aria-label="Purchase Price"
                                value={party.purchasePrice || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Sale Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="salePrice"
                                placeholder="Sale Price"
                                aria-label="Sale Price"
                                value={party.salePrice || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Max. Balance</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="maxBalance"
                                placeholder="Max. Balance"
                                aria-label="Max. Balance"
                                value={party.maxBalance || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Min. Balance</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                name="minBalance"
                                placeholder="Min. Balance"
                                aria-label="Min. Balance"
                                value={party.minBalance || ''}
                                onChange={this.handlePartyChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Effective Start Date</InputGroup.Text>
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
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: "180px" }}>Effective End Date</InputGroup.Text>
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
                                className="mr-1"
                                active>First
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.first}
                                onClick={this.previousParty}
                                className="mr-1"
                                active>Previous
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.nextParty}
                                className="mr-1"
                                active>Next
                            </Button>
                            <Button
                                variant="primary"
                                disabled={navigationDtl.last}
                                onClick={this.lastParty}
                                className="ymr-1"
                                active>Last
                            </Button>
                        </ButtonToolbar>
                        <ButtonToolbar className="ml-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.newParty}
                                className="mr-1"
                                active>Add
                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={() => this.setState({ partyAlert: true })}
                                className="mr-1"
                                active>Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => this.saveParty("Party saved successfully.")}
                                className="mr-1"
                                active>Save
                            </Button>
                            <Button
                                variant="primary"
                                /* disabled={navigationDtl.last}
                                onClick={this.nextParty} */
                                className="mr-1"
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
                        <ButtonGroup className="m-2">
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={this.addBalance}
                                className="mr-1"
                                active>Add Balance
                                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={() => { this.saveParty("Balance saved successfully.") }}
                                className="mr-1"
                                active>Save Balance
                                            </Button>
                            <Button
                                variant="primary"
                                // disabled={navigationDtl.first}
                                onClick={() => this.setState({ balanceAlert: true })}
                                className="mr-1"
                                active>Delete Balance
                                                    </Button>
                            <SweetAlert
                                show={this.state.balanceAlert}
                                warning
                                showCancel
                                confirmBtnText="Delete"
                                confirmBtnBsStyle="danger"
                                cancelBtnBsStyle="default"
                                title="Delete Confirmation"
                                Text="Are you sure you want to delete this balance?"
                                onConfirm={() => this.deleteBalance()}
                                onCancel={() => this.setState({ balanceAlert: false })}
                            >
                                Delete Balance
                                                    </SweetAlert>
                        </ButtonGroup>
                    </Form>
                    <Table
                        striped
                        bordered
                        hover
                        responsive>
                        <thead>
                            <tr>
                                <th>Balance Date</th>
                                <th>Quantity</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances && balances.map((balance, index) => (
                                    <tr key={balance.partyBalanceId}
                                        onFocus={() => { this.setState({ balanceIndex: index }) }}>
                                        <td>
                                            <FormControl
                                                type="date"
                                                name="partyBalanceDate"
                                                placeholder="Balance Date"
                                                aria-label="Balance Date"
                                                value={balance.partyBalanceDate != null ? balance.partyBalanceDate.split("T")[0] : ''}
                                                required
                                                onChange={e => this.handleBalanceChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="number"
                                                name="qnty"
                                                placeholder="Balance Quantity"
                                                aria-label="Balance Quantity"
                                                value={balance.qnty || ''}
                                                required
                                                onChange={e => this.handleBalanceChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <FormControl
                                                type="text"
                                                name="remarks"
                                                placeholder="Remarks"
                                                aria-label="Remarks"
                                                value={balance.remarks || ''}
                                                onChange={e => this.handleBalanceChange(e, index)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Party;