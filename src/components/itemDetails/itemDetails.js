import React, {Component} from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import './itemDetails.css';

const DetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-top: 40px;
    margin-bottom: 40px;
    box-shadow: 0px 0px 13px 0px rgba(255, 50, 50, 0.66);
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const DescrTitle = styled.span`
    font-weight: bold;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <DescrTitle>{label}</DescrTitle>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new GotService();
    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId} = this.props;
        if(!itemId) {
            return
        }

        const {getData} = this.props;
        getData(itemId)
            .then( (item) => {
                this.setState({item})
            })
    }

    render() {

        if (!this.state.item) {
           return <span className='select-error'>Please select an item from the list</span>
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <DetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </DetailsBlock>
        );
    }
}
