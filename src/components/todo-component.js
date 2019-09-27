import React, { Component } from 'react';

import Button from './button.js';

export default class TodoComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      newTask: "",
      tasksList: [],
      error: false
    }
  }

  onChange = ({target: {value}}) => {
    this.setState({
      newTask: value
    });
  }

  onEdit = ({target: {value}}, id) => {
    const updatedTasks = [...this.state.tasksList];
    updatedTasks[id].text = value;
    this.setState({
      updatedTasks
    })
  }

  addTask = (e) => {
    e.preventDefault();
    if (this.state.newTask !== "") {
      this.setState((state)=>({
        newTask: "",
        tasksList:[
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

  checkedTask(id) {
    const checkedTasks = [...this.state.tasksList];
    checkedTasks[id].isChecked = !checkedTasks[id].isChecked;
    this.setState({
      checkedTasks
    })
  }

  editModeTask(id) {
    const editTasks = [...this.state.tasksList];
    editTasks[id].isEdit = !editTasks[id].isEdit;
    editTasks.splice(id, 0)
    this.setState({
      editTasks
    })
  }

  editTask(id){
    const updatedTasks = [...this.state.tasksList];
    updatedTasks[id].isEdit = !updatedTasks[id].isEdit;
    this.setState({
      updatedTasks
    })
  }

  removeTask(id) {
    const updatedTasksList = this.state.tasksList.splice(id, 1)    
    this.setState({
      updatedTasksList
    })
  }

  render(){

    const {
      newTask,
      tasksList,
      error
    } = this.state;

    const tasksListItems = tasksList.map((task, id) => {
      return task.isEdit ?
        <li key={id}>
          <input type="text" value={task.text} onChange={(e)=>this.onEdit(e, id)}/>
          <Button onClick={()=>this.editTask(id)} text="ok"/>
        </li>
        :
        <li key={id}>
          <input type="checkbox" onClick={()=>this.checkedTask(id)}/>
          <span style={{textDecoration: task.isChecked ? "line-through" : null}}>{task.text}</span>
          <Button onClick={()=>this.editModeTask(id)} text="edit"/>
          <Button onClick={()=>this.removeTask(id)} text="remove"/>
        </li>
    })

    return (

      <div className="todo__wrapper">
        <form>
          <input type="text" placeholder="write a task" value={newTask} onChange={this.onChange}/>
          <Button onClick={this.addTask} text="add"/>
        </form>
        <ul>
          {tasksListItems}
        </ul>
        <p style={{display: error !== true ? "none" : "block"}}>error. please, write a task</p>
      </div>

    );

  }

}
