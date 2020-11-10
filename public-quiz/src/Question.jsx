import React, {Component} from 'react';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        // const question = this.props.item.question;
        // const answers = this.props.item.answers;
        const {question, answers} = this.props.item;
        return (
            <div>
                <h2>{question}</h2>

                <form onSubmit={this.handleSubmit}>
                    {answers.map(item => (
                        <div key={item.id}>
                            <label>
                                <input type="radio" name="answers" value={item.id} onChange={this.handleChange}/>
                                {item.value}:
                            </label>
                        </div>
                    ))}

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
