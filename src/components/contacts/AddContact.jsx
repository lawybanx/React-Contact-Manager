import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

export class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  handleSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;
    //Check for Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is Required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is Required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is Required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    axios
      .post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data }));

    // Clear Text Input Fields
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.handleSubmit(dispatch, e)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    handleChange={this.handleChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    handleChange={this.handleChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    handleChange={this.handleChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
