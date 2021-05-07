import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    gotService = new GotService();

    render() {

        const bookId = this.props.bookId;
        return (
            <>
                <ItemDetails 
                    itemId={bookId}
                    getData={this.gotService.getBook} >
                        <Field field='numberOfPages' label='Number of pages'/>
                        <Field field='publisher' label='Publisher'/>
                        <Field field='released' label='Released'/>
                </ItemDetails>
            </>
        )
    }
}