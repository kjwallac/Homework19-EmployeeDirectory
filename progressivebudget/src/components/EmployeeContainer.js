import React, { Component } from "react";
import { getUsers } from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const users = await getUsers();
    this.setState({ users });
    console.log(users[0]);
  }

  handleHeaderClick = event => {
      console.log('Clicked!');
  }

  render() {
    return (
      <div>
        <h2>Employee Container</h2>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th onClick={this.handleHeaderClick}>First Name</th>
              <th onClick={this.handleHeaderClick}>Last Name</th>
              <th onClick={this.handleHeaderClick}>Email</th>
              <th onClick={this.handleHeaderClick}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeContainer;
