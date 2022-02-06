import React from "react"
import {
    FormControl,
    InputGroup,
    Button,
    Modal
} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false
        }
    }

    clickEnter = (e) => {
        if(e.key === 'Enter') {
            this.onLogin()
        }
    }

    onLogin = () => {
        let username = this.refs.username.value
        let password = this.refs.password.value

        if(!username || !password) {
            return this.setState({ error: true})
        }

        this.props.login(username, password)
    }

    render() {
        if(this.props.username) {
            return <Redirect to="/" />
        }

        console.log(this.props.username)
        const { visibility } = this.state
        return (
            <div>
                <div style={styles.contForm}>
                    <h1>Hello,</h1>
                    <h3 className="mb-4">Welcome Back!</h3>
                    <label>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user-circle"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Input Here"
                            ref="username"
                            onKeyDown={(e) => this.clickEnter(e)}
                        />
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                                {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility ? "text" : "password"}
                            ref="password"
                            onKeyDown={(e) => this.clickEnter(e)}
                        />
                    </InputGroup>
                    <div style={styles.contButton}>
                        <Button onClick={this.onLogin} variant="primary" style={styles.button}>
                            <i className="fas fa-sign-in-alt" style={{ marginRight: '10px' }}></i>
                            Login
                        </Button>
                    </div>
                    <p style={styles.goToRegis}>Do You Have an Account? <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/register">Register Here</Link></p>
                    <p style={styles.goToRegis}>Go to <Link style={{ color: '#303f9f', fontWeight: 'bold' }} to="/">Home</Link></p>
                </div>
                <Modal show={this.state.error}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Please input all of data!</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({ error: false })} variant="primary">OK</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.errorLogin}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>This account is doesn't exist!</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.errLoginFalse} variant="primary">OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    cont: {
        background: "url(https://media.istockphoto.com/photos/show-the-city-what-youre-made-of-picture-id1133140907?b=1&k=20&m=1133140907&s=170667a&w=0&h=9zcpX_MUbrByqqmj2_bpXfHLhHoTSX3JhRXo5Gqp3Y0=) no-repeat center",
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '12vh'
    },
    contForm: {
        width: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        padding: '1% 2%'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    button: {
        backgroundColor: '#303f9f',
        border: 'none'
    },
    goToRegis: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0'
    }
}

const mapStateToProps = (state) => {
    return {
        errorLogin: state.userReducer.errorLogin,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, { login, errLoginFalse })(LoginPage)