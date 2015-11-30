var React = require('react');
var Firebase = require('firebase');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },

  componentWillMount: function() {
    this.fb = new Firebase(this.props.rootUrl + 'items/' + this.props.item.key)
  },

  render: function() {
    return <div className='input-group'>
      <span className='input-group-addon'>
        <input 
        type='checkbox' 
        checked={this.state.done ? 'checked' : ''}
        onChange={this.handleCheckBox} /> 
      </span>
      <input type='text'
        className='form-control'
        value={this.state.text}
        onChange={this.handleEdit}
      />
      <span className='input-group-btn'>
        {this.changesButtons()}
        <button className='btn btn-default' onClick={this.handleDelete}>
          Delete
        </button>
      </span>
    </div>
  },

  handleCheckBox: function(event) {
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },

  handleDelete: function() {
    this.fb.remove();
  },

  handleEdit: function(event) {
    this.setState({
      text: event.target.value, 
      textChanged: true
    });
  },

  changesButtons: function() {
    if(this.state.textChanged) {
      return [
        <button className="btn btn-default" >Save</button>,
        <button className="btn btn-default" >Undo</button>
      ]
    }
  },

  handleSaveClick: function() {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },

  handleUndoClick: function() {
    this.setState({text: this.fb.text, textChanged: false});
  }
});