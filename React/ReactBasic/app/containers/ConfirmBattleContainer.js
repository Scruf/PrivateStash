var React = require('react');
var ConfirmBattle = require('../component/Confirmbattle');
var ConfirmBattleContainer = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},
	getIntitialState: function(){
		return {
			isLoading: true,
			playerInfo: []
		}
	},
	render: function(){
		return (
			<ConfirmBattle/>
		)
	}
})

module.exports = ConfirmBattleContainer