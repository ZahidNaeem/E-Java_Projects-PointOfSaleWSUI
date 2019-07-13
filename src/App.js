import React, {Component} from 'react';
import Items from './components/items';

class App extends Component {
    render() {
        return (
            <Items items={this.state.items} />
        )
    }

    state = {
        items: []
    };

    componentDidMount() {
        fetch('http://192.168.109.161:8089/item/all')
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data })
            })
            .catch(console.log)
    }
}

export default App;