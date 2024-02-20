import {Redirect, Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/HomeRoute'
import JobsRoute from './components/JobsRoute'
import JobsDetailsRoute from './components/JobItemDetailsRoute'
import NotFound from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobsDetailsRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
