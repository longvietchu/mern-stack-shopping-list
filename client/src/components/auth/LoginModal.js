import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loginUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        // If have an error
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticed, close modal
        if (this.state.modal) {
            if (isAuthenticated) this.toggle();
        }
    }

    toggle = () => {
        // Clear error
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const user = { email, password };

        // Attempt to login
        this.props.loginUser(user);
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Sign-in</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    placeholder="Enter email..."
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    placeholder="Enter password..."
                                    onChange={this.onChange}
                                />

                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Sign-in
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { loginUser, clearErrors })(LoginModal);
