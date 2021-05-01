import React, {Component} from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import './charDetails.css';

const DetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const DescrTitle = styled.span`
    font-weight: bold;
`;

export default class CharDetails extends Component {

    gotService = new GotService();
    state = {
        char: null
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return
        }

        this.gotService.getCharacter(charId)
            .then( (char) => {
                this.setState({char})
            })
    }

    render() {

        if (!this.state.char) {
           return <span className='select-error'>Please select a character</span>
        }

        const {name, gender, born, died,culture} = this.state.char;

        return (
            <DetailsBlock className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Gender</DescrTitle>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Born</DescrTitle>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Died</DescrTitle>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Culture</DescrTitle>
                        <span>{culture}</span>
                    </li>
                </ul>
            </DetailsBlock>
        );
    }
}
