import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

class Logout extends Component {
    static propstypes = {
        logoutUser: PropTypes.func.isRequired
    };

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logoutUser} href="#">
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(null, { logoutUser })(Logout);
