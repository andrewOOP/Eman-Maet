import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Eman_Maet</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
			<LinkContainer to={'/eventlist'}>
				<NavItem>
					<Glyphicon glyph='th-list' /> Event List
				</NavItem>
			</LinkContainer>
            <LinkContainer to={'/createevent'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Create Event
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/userlist'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> User List
                </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
