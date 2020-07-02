import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    handleValue = () => {
        let value = this.props.value;
        this.props.onButtonPress(value);
    }

    render() {
        return (
            <div style={{ width: 50, height: 50, padding: 25, margin: 10, borderRadius: 10, backgroundColor: '#D7D9DD' }} onClick={this.handleValue}>
                <p style={{fontWeight:'bold'}}>{this.props.value}</p>
            </div>
        )
    }
}