import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';




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

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={ (item) => `${item.name} (${item.gender})`} />
        )

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getData={this.gotService.getCharacter} />
        )

        return(
            <RowBlock leftCol={itemList} rightCol={itemDetails} />
        )
    }
}