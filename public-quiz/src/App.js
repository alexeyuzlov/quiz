import React, {Component} from 'react';
import * as axios from 'axios';
import {Question} from './Question';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            items: [],
            index: 0
        };

        this.questions = [];
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
        this.setState({
            loading: true
        });

        const body = {
            questions: this.questions
        };

        axios.post("http://sample.lan/api/public/quiz", body)
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

    onSubmit(answerId) {
        console.info(this.current, answerId);

        this.questions.push({
            id: this.current.id,
            answerIds: [answerId]
        });

        this.setState((state) => ({
            index: state.index + 1
        }));
    }
}

export default App;
