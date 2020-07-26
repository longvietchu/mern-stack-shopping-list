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
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        registerUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        // If have an error
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
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
        const { name, email, password } = this.state;

        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.registerUser(newUser);
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Sign-up</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    placeholder="Enter name..."
                                    onChange={this.onChange}
                                />

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
                                    Sign-up
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

export default connect(mapStateToProps, { registerUser, clearErrors })(
    RegisterModal
);
