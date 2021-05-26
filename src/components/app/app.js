import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharactersPage, HousesPage, BooksPage, BooksItem} from '../pages/';
import ErrorMessage from '../errorMessage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';


export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState( (state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                className="btn btn-light"
                                onClick={this.toggleRandomChar}>Toggle Random Character</button>
                            </Col>
                        </Row>

                        <Route path='/characters' exact component={CharactersPage} />
                        <Route path='/houses' exact component={HousesPage} />

                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;

                                return <BooksItem bookId={id}/>
                            }
                        } />
                        
                    </Container>
                </div>
            </Router>
        );
    }
};