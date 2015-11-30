var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://glaring-fire-4447.firebaseio.com/';
var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  mixins: [ReactFire],

  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },

  componentWillMount: function() {
    fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },

  render: function() {
    return <div className='row panel panel-default'>
      <div className='col-md-8 col-md-offset-2'> 
        <h2 className='text-center'>To Do List</h2>
        <Header firebase={this.firebaseRefs.items} />
        <hr />
        <div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} rootUrl={rootUrl} />
        </div>
      </div>
    </div> 
  },

  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
