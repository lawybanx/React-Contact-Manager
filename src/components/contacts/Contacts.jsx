import React, { Component } from 'react';
import Contact from './Contact';

import { Consumer } from '../../Context';

export class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          const contactInfo = contacts.map(contact => (
            <Contact key={contact.id} contact={contact} />
          ));
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h1>
              {contactInfo}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
