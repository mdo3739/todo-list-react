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
          {this.deleteButton()}
        </div>
      </div>
    </div> 
  },

  handleDataLoaded: function() {
    this.setState({loaded: true});
  },

  deleteButton: function() {
    if(this.state.items){
      return <div className='text-center clear-complete'>
        <hr/>
        <button
          type='button'
          onClick={this.onDeleteCompleted}
          className='btn btn-default'>
          Clear Completed
        </button>
      </div>
    }
  },

  onDeleteCompleted: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done) {
        fb.child(key).remove();     
      }
    }
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
