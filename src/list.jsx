var React = require('react');

module.exports = React.createClass({
  render: function() {
    console.log(this.props);
    return <ul>
      {this.rednerList()}
    </ul>
  },

  renderList: function() {
    if(this.props.items && Object.keys(this.props.items).length === 0) {

    }
  }
});