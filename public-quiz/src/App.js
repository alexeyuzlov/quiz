import React, {Component} from 'react';
import * as axios from 'axios';
import {Question} from './Question';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            items: [],
            index: 0,
        };
    }

    get current() {
        return this.state.items[this.state.index] || null;
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

        axios.get("http://sample.lan/api/public/quiz")
            .then((response) => response.data)
            .then(
                ({data}) => {
                    this.setState({
                        items: data
                    });
                }
            ).finally(
            () => {
                this.setState({
                    loading: false
                });
            }
        )
    }

    showResults() {
        console.info('Show results');
    }

    render() {
        const {loading} = this.state;
        const item = this.current;
        if (loading) {
            return <div>Loading...</div>;
        } else {
            if (!this.current) {
                return (
                    <div>
                        Completed
                        <button type="button" onClick={this.showResults.bind(this)}>Show results</button>
                    </div>
                )
            }
            return (
                <Question item={item} onSubmit={this.onSubmit.bind(this)}/>
            );
        }
    }

    onSubmit(value) {
        console.info(this.current, value);

        this.setState((state) => ({
            index: state.index + 1
        }));
    }
}

export default App;
