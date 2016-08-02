var React = require('react');
var Confirmbattle = require('../component/Confirmbattle');
var githubHelpers = require('../utils/githubHelpers');
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
  handleInitiaatebattle: function(){
    this.context.router.push({
      pathname: '/results',
      state:{
        playersInfo: this.state.playersInfo
      }
    })
  },
  componentDidMount: function () {
    var query = this.props.location.query;
    console.log("Component Did Mount");
    githubHelpers.getPlayersInfo([query.playerOne,query.playerTwo])
      .then(function(player){
          this.setState({
            isLoading:false,
            playersInfo:[player[0],player[1]]
          })
      }.bind(this))
    // Fetch info from github then update state
  },
  render: function () {
    return (
      <Confirmbattle
        onInitiateBattle ={this.state.handleInitiaatebattle}
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = ConfirmBattleContainer