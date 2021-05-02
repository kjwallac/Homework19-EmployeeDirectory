import React, { Component } from "react";
import { getUsers } from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

class EmployeeContainer extends Component {
  state = {
    users: [],
    filteredUsers: [],
    sortedField: "",
    filteredField: "",
    filterValue: "",
  };

  async componentDidMount() {
    const users = await getUsers();
    this.setState({ users, filteredUsers: users });
    console.log(users[0]);
  }

  createHeaderClickHandlerForField = (sortedField) => {
    return (e) => {
      this.state.filteredUsers.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });
      this.setState({
        filteredUsers: [...this.state.filteredUsers],
        sortedField,
      });
    };
  };

  createFilterClickHandlerForField = (filteredField) => {
    return (e) => {
      console.log(filteredField);
      this.setState({ filteredField });
    };
  };

  filterClickHandler = (e) => {
    const field = this.state.filteredField;
    const filteredUsers = this.state.users.filter((user) => {
      if (
        user[field]
          .toLowerCase()
          .startsWith(this.state.filterValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    this.setState({ filteredField: "", filteredUsers });
  };

  filterValueChanged = (e) => {
    this.setState({ filterValue: e.target.value });
  };

  render() {
    return (
      <div>
        <h2>Employee Container</h2>
        {this.state.filteredField && (
          <div>
            <input
              onChange={this.filterValueChanged}
              value={this.state.filterValue}
            />
            <button onClick={this.filterClickHandler}>Filter</button>
          </div>
        )}
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th
                style={
                  this.state.sortedField === "firstName"
                    ? { borderBottom: "1px solid black" }
                    : { cursor: "pointer" }
                }
              >
                <span
                  onClick={this.createHeaderClickHandlerForField("firstName")}
                >
                  First Name
                </span>
                <FontAwesomeIcon
                  onClick={this.createFilterClickHandlerForField("firstName")}
                  icon={faFilter}
                  style={{ float: "right" }}
                />
              </th>
              <th
                style={
                  this.state.sortedField === "lastName"
                    ? { borderBottom: "1px solid black" }
                    : { cursor: "pointer" }
                }
              >
                <span
                  onClick={this.createHeaderClickHandlerForField("lastName")}
                >
                  Last Name
                </span>
                <FontAwesomeIcon
                  onClick={this.createFilterClickHandlerForField("lastName")}
                  icon={faFilter}
                  style={{ float: "right" }}
                />
              </th>
              <th
                style={
                  this.state.sortedField === "email"
                    ? { borderBottom: "1px solid black" }
                    : { cursor: "pointer" }
                }
              >
                <span onClick={this.createHeaderClickHandlerForField("email")}>
                  Email
                </span>
                <FontAwesomeIcon
                  onClick={this.createFilterClickHandlerForField("email")}
                  icon={faFilter}
                  style={{ float: "right" }}
                />
              </th>
              <th
                style={
                  this.state.sortedField === "phone"
                    ? { borderBottom: "1px solid black" }
                    : { cursor: "pointer" }
                }
              >
                <span onClick={this.createHeaderClickHandlerForField("phone")}>
                  Phone
                </span>
                <FontAwesomeIcon
                  onClick={this.createFilterClickHandlerForField("phone")}
                  icon={faFilter}
                  style={{ float: "right" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredUsers.map((user) => {
              return (
                <tr key={user.email}>
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
