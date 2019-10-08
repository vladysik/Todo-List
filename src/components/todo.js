import React, {Component} from 'react';

let a = { textDecoration: "line-through", };
let b = { textDecoration: null, };

export default class Task extends Component {

  handleEdit = (e) => {
    this.props.onEdit(e, this.props.id);
  }

  handeCheckedTask = () => {
    this.props.onCheckedTask(this.props.id);
  }

  handleEditModeTask = () => {
    this.props.onEditModeTask(this.props.id);
  }

  handleEditTask = () => {
    this.props.onEditTask(this.props.id);
  }

  handleRemoveTask = () => {
    this.props.onRemoveTask(this.props.id);
  }

  render() {
    const { task, } = this.props;
    return (
      task.isEdit ? (
        <li>
          <input type="text" value={task.text} onChange={this.handleEdit} />
          <button onClick={this.handleEditModeTask}>ok</button>
        </li>
      ) : (
          <li>
            <input type="checkbox" onClick={this.handeCheckedTask} />
            <span style={task.isChecked ? a : b}>{task.text}</span>
            <button onClick={this.handleEditModeTask}>edit</button>
            <button onClick={this.handleRemoveTask}>remove</button>
          </li>
        )
    );
  }

}
