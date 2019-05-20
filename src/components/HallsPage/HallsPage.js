import React, { Component } from 'react';
import { connect } from "react-redux";
//import './HallsPage.css';

import { Button, Card, Image } from 'semantic-ui-react'

class HallsPage extends Component {
  render() {
    const { items: halls } = this.props.halls
    return (
      <Card.Group centered as="main" className="main-content">
        {halls.map(hall => (<Card
          key={hall._id}
          image={hall.imageURL}
          header={hall.title}
          description={hall.description}
        />))}
      </Card.Group>
    );
  }
}

const mapStateToProps = ({ halls }) => ({ halls });

HallsPage = connect(
  mapStateToProps
)(HallsPage);

export default HallsPage;