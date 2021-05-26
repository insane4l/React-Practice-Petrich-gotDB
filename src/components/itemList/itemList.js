import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';

const ListGroupItem = styled.li`
    cursor: pointer;
`;

const ListGroup = styled.ul`
    margin-top: 40px;
    box-shadow: 0px 0px 13px 0px rgba(255, 50, 50, 0.66);
`

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }


    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                    error: false
                })
            })
            .catch( () => {this.onError()});
    }
    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError = () => {
        this.setState({
            itemList: null,
            error: true
        })
    }


    renderItems(arr) {
        return arr.map( (item) => {

            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <ListGroupItem 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {itemList, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ListGroup className="item-list list-group">
                {items}
            </ListGroup>
        );
    }
}