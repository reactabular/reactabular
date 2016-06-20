import React from 'react';
import { SkyLightStateless } from 'react-skylight';

const Modal = ({ show, title, onCloseClicked, children }) => (
  <SkyLightStateless
    isVisible={show}
    title={title}
    onCloseClicked={onCloseClicked}
  >{children}</SkyLightStateless>
);
Modal.propTypes = {
  show: React.PropTypes.bool,
  title: React.PropTypes.string,
  onCloseClicked: React.PropTypes.func,
  children: React.PropTypes.any,
};

export default Modal;
