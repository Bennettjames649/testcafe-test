import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';

/* eslint-disable max-len */

class TopHeader extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/">
          <Header inverted as='h1'>meteor-application-template</Header>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add-stuff" key='add-stuff'>Add Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list-stuff" key='list-stuff'>List Stuff</Menu.Item> ]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Account" as={NavLink} exact to="/account"/>
                <Dropdown.Item icon="settings" text="Settings" as={NavLink} exact to="/settings"/>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

TopHeader.propTypes = {
  currentUser: PropTypes.string,
};

// withRouter HOC.
// see explanation: https://reacttraining.com/react-router/web/api/withRouter

const TopHeaderContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(TopHeader);

export default withRouter(TopHeaderContainer);
