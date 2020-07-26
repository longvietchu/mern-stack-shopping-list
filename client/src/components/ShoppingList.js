import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getItems, deleteItem } from '../actions/itemActions';
import ItemModal from './ItemModal';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        const { isAuthenticated } = this.props;
        return (
            <Container>
                <ItemModal />
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition
                                key={id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    {isAuthenticated ? (
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(
                                                this,
                                                id
                                            )}
                                        >
                                            &times;
                                        </Button>
                                    ) : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
