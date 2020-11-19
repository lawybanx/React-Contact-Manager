import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Consumer } from '../../Context';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    const showContactInfo = !this.state.showContactInfo;
    this.setState({ showContactInfo });
  };

  handleDelete = (id, dispatch) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }));
  };

  render() {
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                />
                <i
                  className="fas fa-trash-alt"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={() => this.handleDelete(id, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: '#000',
                      marginRight: '1rem'
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone:{phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
