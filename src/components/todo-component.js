import React, { Component } from 'react';

export default class TodoComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      newTask: "",
      tasksList: [],
      isCompleted: false
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      newTask: e.target.value
    });
  }

  addTask = (e) => {
    e.preventDefault();
    this.setState({
      newTask: "",
      tasksList:[...this.state.tasksList, this.state.newTask]
    });
  }

  removeTask(id) {
    var updatedTasksList = this.state.tasksList.splice(id, 1)    
    this.setState({
      updatedTasksList
    })
  }

  completeTask(id) {
    this.setState({
      isCompleted : !this.state.isCompleted
    })
    console.log(id + " " + this.state.isCompleted);
  }

  render(){

    const {
      newTask,
      tasksList,
      isCompleted
    } = this.state;

    const tasksListItems = tasksList.map((task, id) =>
        <li key={id}>
          <input type="checkbox" onClick={()=>this.completeTask(id)}/>
          <span className={isCompleted ? "completed" : ""}>{task}</span> <button onClick={()=>this.removeTask(id)}>remove</button>
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
