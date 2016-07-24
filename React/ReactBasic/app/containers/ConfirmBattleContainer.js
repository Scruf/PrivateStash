var React = require('react');
var Confirmbattle = require('../component/Confirmbattle');
var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
  	console.log("Component initial State");
    return {
      isLoading: true,
      playersInfo: [],
    }
  },
  componentWillReceiveProps: function(){
  	console.log("component will receive something I do not know");
  },
  componentWillUnmount: function(){
  	console.log("Component Will Unmount Something I do not know");
  },
  componentWillMount: function(){
  	console.log("Component Will Mount");
  },

  componentDidMount: function () {
    var query = this.props.location.query;
    console.log("Component Did Mount");
    // Fetch info from github then update state
  },
  render: function () {
    return (
      <Confirmbattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = ConfirmBattleContainer