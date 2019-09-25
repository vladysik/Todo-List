import React, { Component } from 'react';

export default class TodoComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      newTask: "",
      tasksList: []
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
    this.setState({
      newTask: "",
      tasksList:[
        ...this.state.tasksList, 
        {
          text: this.state.newTask,
          isChecked: false,
          isEdit: false
        }]
    });
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
      tasksList
    } = this.state;

    const tasksListItems = tasksList.map((task, id) => {
      return task.isEdit ?
        <li key={id}>
          <input type="text" value={task.text} onChange={(e)=>this.onEdit(e, id)}/>
          <button onClick={()=>this.editTask(id)}>ok</button>
        </li>
        :
        <li key={id}>
          <input type="checkbox" onClick={()=>this.checkedTask(id)}/>
          <span style={{textDecoration: task.isChecked ? "line-through" : null}}>{task.text}</span>
          <button onClick={()=>this.editModeTask(id)}>edit</button>
          <button onClick={()=>this.removeTask(id)}>remove</button>
        </li>
    })

    return (

      <div className="todo__wrapper">
        <form>
          <input type="text" placeholder="write a task" value={newTask} onChange={this.onChange}/>
          <button onClick={this.addTask}>add</button>
        </form>
        <ul>
          {tasksListItems}
        </ul>
      </div>

    );

  }

}
