import React, {Component} from 'react';
import GotService from '../../services/gotService';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../errorMessage';

export default class CharactersPage extends Component {

    gotService = new GotService();
    state = {
        selectItem: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return(
            <Row>
                <Col md='6'>
                    <ItemList 
                        onItemSelected={this.onItemSelected}
                        getData={this.gotService.getAllCharacters}
                        renderItem={ (item) => `${item.name} (${item.gender})`} />
                </Col>
                <Col md='6'>
                    <ItemDetails 
                        itemId={this.state.selectedItem}
                        getData={this.gotService.getCharacter} />
                </Col>
            </Row>
        )
    }
}