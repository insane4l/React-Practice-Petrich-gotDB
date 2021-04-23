import React, {Component} from 'react';
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

    render() {
        return (
            <DetailsBlock className="rounded">
                <h4>John Snow</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Gender</DescrTitle>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Born</DescrTitle>
                        <span>1783</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Died</DescrTitle>
                        <span>1820</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <DescrTitle>Culture</DescrTitle>
                        <span>First</span>
                    </li>
                </ul>
            </DetailsBlock>
        );
    }
}