import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Group } from './components/Group';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import Todos from "./components/todos";
import GroupTasks from "./components/GroupTasks"
import NewTaskForm from "./components/NewTaskForm";
import NewGroupForm from "./components/NewGroupForm";
import GroupUsers from "./components/GroupUsers";
import AddNewUser from "./components/AddNewUser";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route exact path='/groups' component={Group} />
            <Route path='/groups/:id' component={GroupTasks} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <AuthorizeRoute path="/zadaci" component={Todos} />
            <AuthorizeRoute path="/addTask" component={NewTaskForm} />
            <AuthorizeRoute path="/addGroup" component={NewGroupForm} />
            <AuthorizeRoute path="/groupUsers/:id" component={GroupUsers} />
            <AuthorizeRoute path="/addUser/:id" component={AddNewUser}/>
      </Layout>
    );
  }
}
