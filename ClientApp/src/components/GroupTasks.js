import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import { Container, Row, Col } from 'reactstrap';
import "./Section.css";
import Backlog from "./backlog.js";
import Done from "./done.js";
import { Accordion } from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';

class GroupTasks extends Component {
    static displayName = GroupTasks.name;

    constructor(props) {
        super(props);
        this.state = { Tasks: [] };
        //this.deleteTodo = this.deleteTodo.bind(this);
    }

    async componentDidMount() {
        let token = await authService.getAccessToken();
        console.log(token);
        Axios.get("https://localhost:44334/api/Groups/" + this.props.match.params.id, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                console.log("Proslo");
                console.log(res.data);
                this.setState({ Tasks: res.data.listOfTasks })
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Link to="addTask">Dodaj novi zadatak </Link>
                <br/>
                <Link to={`/groupUsers/${this.props.match.params.id}`}>Clanovi ove grupe</Link>
                <br />
                <Link to={`/addUser/${this.props.match.params.id}`}>Dodaj korisnika u grupu </Link>
                
                <Container>
                    <Row>
                        <Col md="6">
                            <div class="section">
                                <h2>Backlog</h2>
                                <Accordion allowZeroExpanded="true">
                                    {this.state.Tasks.filter(t => !t.isDone).map(p => {
                                        return <Backlog task={p} delete={this.delete} done={this.done} />
                                    })}
                                </Accordion>
                            </div>
                        </Col>
                        <Col md="6">
                            <div class="section">
                                <h2>Done</h2>
                                <Accordion allowZeroExpanded="true">
                                    {this.state.Tasks.filter(t => t.isDone).map(p => {
                                        return <Done task={p} delete={this.delete}/>
                                    })}
                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default GroupTasks;