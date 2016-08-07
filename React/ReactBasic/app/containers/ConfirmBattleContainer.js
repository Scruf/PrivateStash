var React = require('react');
var Confirmbattle = require('../component/Confirmbattle');
var githubHelpers = require('../utils/githubHelpers');
var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
   return {
      isLoading: true,
      playersInfo: [],
    }
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
            isLoading:true,
            playersInfo:[player[0],player[1]]
          })
      }.bind(this))
    // Fetch info from github then update state
  },
  render: function () {
    console.log("Displaying Confirm Battle State",this.state);
    return (
      <Confirmbattle
        onInitiateBattle ={this.handleInitiaatebattle}
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = ConfirmBattleContainer