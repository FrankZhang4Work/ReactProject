const React = require('react');

let styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}

class Loading extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: props.text
		};
	}

	componentDidMount() {
		let stopper = this.props.text + '...';

		this.interval = setInterval(function() {
			if(this.state.text === stopper) {
				this.setState(() => {
					return {
						text: this.props.text
					}
				});
			} else {
				this.setState((prevState) => {
					return {
						text: prevState.text + '.'
					}
				});
			}
		}.bind(this), this.props.speed);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)
	}
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 200
};

module.exports = Loading;