import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage';

const ListGroupItem = styled.li`
    cursor: pointer;
`;

export default class ItemList extends Component {

    gotService = new GotService();
    state = {
        charList: null,
        error: false
    }


    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList,
                    error: false
                })
            })
            .catch( () => {this.onError()});
    }
    componentDidCatch() {
        this.setState({
            charList: null,
            error: true
        })
    }

    onError = () => {
        this.setState({
            charList: null,
            error: true
        })
    }


    renderItems(arr) {
        return arr.map( (item) => {
            return (
                <ListGroupItem 
                    key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {item.name}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {charList, error} = this.state;
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}