// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { login } from "../redux/actions/auth";
// import { Message } from 'semantic-ui-react';
// import './Header.css';
// import { closePopup } from "../redux/actions/popup";

// //import { Button, Card, Image } from 'semantic-ui-react'

// class PopupMessage extends Component {
//   render() {
//     const { closePopup, popup } = this.props
//     return (
//       <Message
//         className="popup-message" 
//         onDismiss={closePopup} 
//         visible={popup.isVisible} 
//         floating content={content} 
//         {...attributes} />
//     );
//   }
// }

// const mapStateToProps = ({ popup }) => ({ popup });
// const mapDispatchToProps = dispatch => ({
//   closePopup: () => dispatch(closePopup())
// });

// PopupMessage = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PopupMessage);

// export default PopupMessage;