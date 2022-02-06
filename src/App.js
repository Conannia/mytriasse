import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// import pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisPage from './pages/register';
import LabPage from './pages/labinfo';



//import actions
import { keepLogin } from './redux/actions'

class App extends React.Component {
  componentDidMount(){
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }

  render() {
    console.log(this.props.role)
    if(this.props.role === "admin") {
      return(
        <div style={{backgroundColor: '#FFCDDD'}}>
          <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisPage} />
            <Route path="/labinfo" component={LabPage} />
          </Switch>
        </div>
      )
    } 
    return (
      <div style={{backgroundColor: '#FFCDDD'}}>
          <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisPage} />
            <Route path="/labinfo" component={LabPage} />
          </Switch>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin })(App);
