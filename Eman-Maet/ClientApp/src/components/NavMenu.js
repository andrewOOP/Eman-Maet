﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component
{
    displayName = NavMenu.name

    constructor(props) {
        super(props);
        this.state = { isAdmin: "" };

        fetch('api/user/GetCurrentUser', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ isAdmin: response.securityRole });
                if (this.state.isAdmin === "Administrator") {
                    this.setState({ isAdmin: true });
                }
                else { this.setState({ isAdmin: false }); }
            })
            .catch(error => console.error('Error:', error));
    }

    render()
    {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
                <Nav>
                    <LinkContainer to={'/myprofile'}>
                        <NavItem>
                            <Glyphicon glyph='user' /> My Profile
                </NavItem>
                    </LinkContainer>
                    {!this.state.isAdmin &&
                        <LinkContainer to={'/userhome'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Home
                </NavItem>
                        </LinkContainer>
                    }
			 <LinkContainer to={'/eventlist'}>
				<NavItem>
					<Glyphicon glyph='th-list' /> Event List
				</NavItem>
             </LinkContainer>
             {this.state.isAdmin &&
             <LinkContainer to={'/userlist'}>
                 <NavItem>
                      <Glyphicon glyph='th-list' /> User List
                </NavItem>
              </LinkContainer>
             }
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
                </Nav>
                <Navbar.Brand>
                    <Link to={'/'}>Log Out</Link>
                </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
