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

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { Tasks: [] };
    }

    async componentDidMount() {
        let token = await authService.getAccessToken();
        console.log(token);
        Axios.get("https://localhost:44334/api/Todos", {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                console.log("Proslo");
                console.log(res.data);
                this.setState({ Tasks: res.data })
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }

    delete = async (id) => {
        let token = await authService.getAccessToken();
        Axios.delete("https://localhost:44334/api/Todos/"+id, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                this.setState({
                    Tasks: this.state.Tasks.filter(t => t.taskId != id)
                })
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }

    /* let token = await authService.getAccessToken();
        todo.isDone = true;
        Axios.put("https://localhost:44334/api/Todos/" + todo.id, { todo }, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => { */

    done = async (p) => {
        let token = await authService.getAccessToken();
        console.log(p);
        p.isDone = true;
        Axios.put("https://localhost:44334/api/Todos/" + p.taskId, p,
            {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                console.log("Proslo");
                console.log(res.data);
                //this.setState({ Tasks: res.data })
                let t = this.state.Tasks.map(lol => {
                    if (lol.taskId == p.taskId) lol.isDone = true;
                    return lol;
                })
                this.setState({ Tasks: t });
                
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }


  render () {
    return (
      <div>
            <Link to="addTask">Dodaj novi zadatak </Link>

            <Container>
                <Row>
                    <Col md="6">
                        <div class="section">
                            <h2>Backlog</h2>
                            <Accordion allowZeroExpanded="true">
                                {this.state.Tasks.filter(t => !t.isDone).map(p => {
                                    return <Backlog task={p} delete={this.delete} done={() => this.done(p)} />
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
