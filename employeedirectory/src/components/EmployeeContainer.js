import React, { Component } from "react";
import { getUsers } from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    users: [],
    sortedField: "",
  };

  async componentDidMount() {
    const users = await getUsers();
    this.setState({ users });
    console.log(users[0]);
  }

  handleHeaderClick = (event) => {
    let sortedField = "";
    switch (event.target.innerHTML) {
      case "First Name":
        sortedField = "firstName";
        break;
      case "Last Name":
        sortedField = "lastName";
        break;
      case "Phone":
        sortedField = "phone";
        break;
      case "Email":
        sortedField = "email";
        break;
      default:
        sortedField = "";
    }
    if (sortedField) {
      this.state.users.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ users: [...this.state.users], sortedField });
  };

  render() {
    return (
      <div>
        <h2>Employee Container</h2>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th
                style={
                  this.state.sortedField === "firstName"
                    ? { borderBottom: "1px solid black" }
                    : {}
                }
                onClick={this.handleHeaderClick}
              >
                First Name
              </th>
              <th
                style={
                  this.state.sortedField === "lastName"
                    ? { borderBottom: "1px solid black" }
                    : {}
                }
                onClick={this.handleHeaderClick}
              >
                Last Name
              </th>
              <th
                style={
                  this.state.sortedField === "email"
                    ? { borderBottom: "1px solid black" }
                    : {}
                }
                onClick={this.handleHeaderClick}
              >
                Email
              </th>
              <th
                style={
                  this.state.sortedField === "phone"
                    ? { borderBottom: "1px solid black" }
                    : {}
                }
                onClick={this.handleHeaderClick}
              >
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
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
