import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: '',
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL;
    console.log(USERS_SERVICE_URL)
  };

  getUsers() {
    // set REACT_APP_USERS_SERVICE_URL=http://192.168.99.100
    // source REACT_APP_USERS_SERVICE_URL=http://192.168.99.100

    const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL;
    // const USERS_SERVICE_URL = 'http://192.168.99.100';
    axios.get(`${USERS_SERVICE_URL}/users`)
      .then(res => this.setState({ users: res.data.data.users }))
      .catch(err => console.log(err));
  }

  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };

    // console.log('----addUser----');
    // console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
    
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then((res) => { 
        console.log(res); 
        this.getUsers();
        this.setState({
          username: '',
          email: ''
        });
      })
      .catch((err) => { console.log(err); });
  }

  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
    // console.log(obj)
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <br/>
            <h1>All Users</h1> 
            <hr/>
            <br/>
            <AddUser
              username={this.state.username}
              email={this.state.email}
              addUser={this.addUser}
              handleChange={this.handleChange}
            />
            <br/>
            <UsersList users={this.state.users}/>
          </div>
        </div>
      </div>
    )
  }
};

export default App;
