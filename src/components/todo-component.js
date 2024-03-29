import React, {Component} from 'react';

import Task from './todo.js';

export default class TodoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      tasksList: [],
      error: false
    }
  }

  onChange = ({ target: { value } }) => {
    this.setState({
      newTask: value
    });
  }

  onEdit = ({ target: { value } }, id) => {
    const updatedTasks = [...this.state.tasksList];
    updatedTasks[id].text = value;
    this.setState({
      updatedTasks
    })
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.newTask !== "") {
      this.setState((state) => ({
        newTask: "",
        tasksList: [
          ...state.tasksList,
          {
            text: state.newTask,
            isChecked: false,
            isEdit: false
          }],
        error: false
      }));
    } else {
      this.setState({
        error: true
      });
    }
  }

  checkedTask = (id) => {
    const checkedTasks = [...this.state.tasksList];
    checkedTasks[id].isChecked = !checkedTasks[id].isChecked;
    this.setState({
      checkedTasks
    })
  }

  editModeTask = (id) => {
    const editTasks = [...this.state.tasksList];
    editTasks[id].isEdit = !editTasks[id].isEdit;
    editTasks.splice(id, 0)
    this.setState({
      editTasks
    })
  }

  editTask = (id) => {
    const updatedTasks = [...this.state.tasksList];
    updatedTasks[id].isEdit = !updatedTasks[id].isEdit;
    this.setState({
      updatedTasks
    })
  }

  removeTask = (id) => {
    const updatedTasksList = this.state.tasksList.splice(id, 1)
    this.setState({
      updatedTasksList
    })
  }

  render() {

    const {
      newTask,
      tasksList,
      error
    } = this.state;

    const tasksListItems = tasksList.map((task, id) => {
      return <Task
        key={id}
        task={task}
        id={id}
        onEdit={this.onEdit}
        onCheckedTask={this.checkedTask}
        onEditModeTask={this.editModeTask}
        onEditTask={this.editTask}
        onRemoveTask={this.removeTask}
      />;
    })

    return (

      <div className="todo__wrapper">
        <form>
          <input type="text" placeholder="write a task" value={newTask} onChange={this.onChange} />
          <button onClick={this.addTask}>add</button>
        </form>
        <ul>
          {tasksListItems}
        </ul>
        <p style={{ display: error !== true ? "none" : "block" }}>error. please, write a task</p>
      </div>

    );

  }

}
