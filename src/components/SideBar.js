import React, { Component } from 'react';
//import { Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import "./SideBar.css"
import { List } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";



class SideBar extends Component {
  render() {
    const { items: halls } = this.props.halls
    return (
      <nav className="side-bar">
        <List link>
          <List.Header as={NavLink} to="/halls">Halls</List.Header>
          {halls.map(hall =>
            (<List.Item as={NavLink} activeStyle={{ fontWeight: "bold" }} key={hall._id} to={`/hall/${hall._id}`}>{hall.title}</List.Item>)
          )}
        </List>
      </nav>
    );
  }
}

const mapStateToProps = ({ halls }) => ({ halls });

SideBar = connect(
  mapStateToProps
)(SideBar);

export default SideBar;