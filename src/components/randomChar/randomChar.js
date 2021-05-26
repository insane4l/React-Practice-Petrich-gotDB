import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 13px 0px rgba(255, 50, 50, 0.66);
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const DescrTitle = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {
   
    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { // ES9 class fields; dont need to use bind() on event listener
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updateChar = () => {
        let id = Math.floor(Math.random()*80 + 40);
        // let id = 5555; // error-test
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMsg = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <Content char={char}/> : null;

        return (
            <RandomBlock className="rounded">
                {spinner}
                {content}
                {errorMsg}
            </RandomBlock>
            
        );
    }
}

const Content = ({char}) => { // {char}  ||  props
    const {name, gender, born, died, culture} = char; //char  ||  this.props.char
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <DescrTitle>Gender </DescrTitle>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <DescrTitle>Born </DescrTitle>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <DescrTitle>Died </DescrTitle>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <DescrTitle>Culture </DescrTitle>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
