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

  addTask = (e) => {
    e.preventDefault();
    this.setState({
      newTask: "",
      tasksList:[
        ...this.state.tasksList, 
        {
          text: this.state.newTask,
          isChecked: false
        }]
    });
  }

  completeTask(id) {
    const completedTodos = [...this.state.tasksList];
    completedTodos[id].isChecked = !completedTodos[id].isChecked;
    this.setState({
      completedTodos
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

    const tasksListItems = tasksList.map((task, id) =>
      <li key={id}>
        <input type="checkbox" onClick={()=>this.completeTask(id)}/>
        <span style={{textDecoration: task.isChecked ? "line-through" : null}}>{task.text}</span>
        <button onClick={()=>this.removeTask(id)}>remove</button>
      </li>
    )

    return(

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
