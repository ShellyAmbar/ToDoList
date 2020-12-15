import React, { useState, PureComponent } from "react";
import CardToDo from "./components/card";

import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toDoValue: "",
      toDoList: [],
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.getToDoToListFromDB();
  }

  onInputChange = (e) => {
    this.setState({
      toDoValue: e.target.value,
    });
  };
  resetInput = () => {
    this.setState({
      toDoValue: "",
    });
  };
  getToDoToListFromDB = () => {
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      },
    };
    fetch("http://192.168.14.176:8080/getToDos", options)
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          console.log(data, "in app.js client");
          this.setState({
            toDoList: data,
          });
        } else {
          console.log(data, "no data from server in app.js client");
        }
      })
      .catch((err) => console.log(err, "in app client"));
  };
  setToDoToDB = () => {
    const options = {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      },
      body: JSON.stringify({
        todo: this.state.toDoValue,
      }),
    };
    fetch("http://192.168.14.176:8080/", options)
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          console.log(data, "in app.js client");
        }
      })
      .catch((err) => console.log(err));
  };

  addNewToDoToList = (e) => {
    this.setState({
      toDoList: [...this.state.toDoList, this.state.toDoValue],
    });
    this.setToDoToDB();
    this.getToDoToListFromDB();
    this.resetInput();
  };
  deleteToDoFromList = (e) => {
    const options = {
      method: "delete",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      },
    };

    const indexInList = e.target.id;
    fetch("http://192.168.14.176:8080/" + indexInList, options)
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          console.log(data, "in app.js client");
        }
      })
      .catch((err) => console.log(err));
  };
  editToDoInList = (e) => {
    const options = {
      method: "put",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
      },
      body: JSON.stringify({
        todo: this.state.toDoValue,
      }),
    };
    const indexInList = e.target.id;
    fetch("http://192.168.14.176:8080/" + indexInList, options)
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          console.log(data, "in app.js client");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h1>To Do</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-2" />
            <div className="col-lg-8">
              <form id="form">
                <div className="form-group">
                  <label>Create new To Do:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="toDoInput"
                    placeholder="Enter to do here"
                    value={this.state.toDoValue}
                    onChange={(e) => this.onInputChange(e)}
                  />
                  <button
                    style={{ marginTop: "10px" }}
                    onClick={(e) => this.addNewToDoToList(e)}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-2" />
          </div>
          <div className="row">
            <div className="col-lg-2" />
            <div className="col-lg-8">
              {this.state.toDoList != null ? (
                <div className="row">
                  {this.state.toDoList.map((toDo, index) => (
                    <CardToDo
                      className="col-md-4"
                      id={index}
                      title={toDo}
                      body={""}
                      link1={"Edit"}
                      link2={"Delete"}
                      editToDoInList={(e) => this.editToDoInList(e)}
                      deleteToDoFromList={(e) => this.deleteToDoFromList(e)}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h1>List is empthy</h1>
                </div>
              )}
            </div>
            <div className="col-lg-2" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
