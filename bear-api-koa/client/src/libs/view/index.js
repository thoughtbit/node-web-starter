import React from 'react';
import PropTypes from 'prop-types';

class View extends React.Component {
  render() {
    /* eslint-disable no-prototype-builtins */
    const style = this.props.hasOwnProperty('show') && !this.props.show && {
      display: 'none'
    };

    if (React.Children.count(this.props.children) > 1) {
      return React.createElement(this.props.component, {
        style: Object.assign({}, this.props.style, style),
        className: this.props.className
      }, this.props.children);
    } else {
      return React.cloneElement(this.props.children, {
        style: Object.assign({}, this.props.children.props.style, style)
      });
    }
  }
}

View.propTypes = {
  show: PropTypes.any,
  component: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

View.defaultProps = {
  component: 'span'
};

export default View;
