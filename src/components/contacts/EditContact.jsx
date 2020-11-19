import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

export class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  //Sort of like a placeholder with the user's info in the input fields.
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  handleSubmit = async (dispatch, e) => {
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

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
