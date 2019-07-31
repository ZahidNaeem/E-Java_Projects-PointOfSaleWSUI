class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: props.data
        };
    }

    handleChange(index, dataType, value) {
        const newState = this.state.materials.map((item, i) => {
            if (i == index) {
                return { ...item, [dataType]: value };
            }
            return item;
        });

        this.setState({
            materials: newState
        });
    }

    render() {
        console.clear();
        console.log(JSON.stringify(this.state.materials));
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Price (£)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.materials.map((row, index) => {
                        return (
                            <tr>
                                <td>
                                    <input onChange={(e) => this.handleChange(index, 'qty', e.target.value)}
                                        type='number'
                                        className='form-control'
                                        step='1' min="1"
                                        value={this.state.materials[index].qty} />
                                </td>
                                <td>
                                    <input onChange={(e) => this.handleChange(index, 'desc', e.target.value)}
                                        type='text'
                                        className='form-control'
                                        value={this.state.materials[index].desc} />
                                </td>
                                <td>
                                    <input onChange={(e) => this.handleChange(index, 'price', e.target.value)}
                                        type='text'
                                        className='form-control'
                                        placeholder='6.00'
                                        value={this.state.materials[index].price} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


const materials = [
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' },
    { qty: '', desc: '', price: '' }
]


ReactDOM.render(<Table data={materials} />, document.getElementById('app'));