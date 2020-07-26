import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavBar extends Component {
    state = {
        isOpen: false
    };

    static propsTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLink = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome, ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );
        const guestLink = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLink : guestLink}
                                <NavItem>
                                    <NavLink href="https://github.com/longvietchu">
                                        Github
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);
