import { userReducer } from "react"

const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    role: "",
    cart: [],
    errorLogin: false,
    errorRegister: [false, ''],
    successRegister: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.palyload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
                cart: action.payload.cart
            }
        case 'ERROR_LOGIN':
            return {
                ...state,
                errorLogin: true
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'USERNAME_EMAIL_EXIST':
            return {
                ...state,
                errorRegister: [true, 'Username or email already exist']
            }
        case 'RESET_REG_ERR':
            return {
                 ...state,
                errorRegister: [false, '']
            }
        case 'SUCCESS_REGISTER' :
            return {
                ...state,
                successRegister: true
            }
        default:
            return state
    }
}

export default userReducer