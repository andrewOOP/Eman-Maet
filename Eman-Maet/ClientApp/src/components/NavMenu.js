import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component
{
  displayName = NavMenu.name

    render()
    {
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
            <LinkContainer to={'/userlist'}>
                <NavItem>
                   <Glyphicon glyph='th-list' /> User List
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/teamlist'}>
                <NavItem>
                   <Glyphicon glyph='th-list' /> Team List
                </NavItem>
            </LinkContainer>
             <LinkContainer to={'/locationlist'}>
                <NavItem>
                   <Glyphicon glyph='th-list' /> Location List
                </NavItem>
                    </LinkContainer>
             <LinkContainer to={'/createsession'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Create Session
                </NavItem>
                    </LinkContainer>
			 <LinkContainer to={'/sessiondetails?id=1'}>
			    <NavItem>
					<Glyphicon glyph='th-list' /> Session Details (1)
                </NavItem>
			 </LinkContainer>
             <LinkContainer to={'/myprofile'}>
                 <NavItem>
                     <Glyphicon glyph='th-list' /> My Profile
                </NavItem>
             </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
