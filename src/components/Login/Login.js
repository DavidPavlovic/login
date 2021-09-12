import React, { useState, useEffect, useReducer,useContext, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT') return {value: action.val, isValid: action.val.includes('@')};
    if(action.type === 'INPUT_BLUR') return {value: state.value, isValid: state.value.includes('@')}

    return {value: '', isValid: false}
};

const passwordReducer = (state, action) => {
    if(action.type === 'USER_INPUT') return {value: action.val, isValid: action.val.trim().length > 6};
    if(action.type === 'INPUT_BLUR') return {value: state.value, isValid: state.value.trim().length > 6}

    return {value: '', isValid: false}
};

const Login = (props) => {

    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
         value: '',
         isValid: false   
    });

    const ctx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        console.log('test1')
    }, []);

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('Checking')
            setFormIsValid(
                emailIsValid  && passwordIsValid
            );
        }, 500);

        return () => {
            console.log('Cleared');
            clearTimeout(timer);
        }
       
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value
        });
    };

    const passwordChangeHandler = (event) => {

        console.log()
        dispatchPassword({
            type: 'USER_INPUT',
            val: event.target.value
        });
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR', })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value);
        }else if(!emailIsValid) {
            emailInputRef.current.focus();
        }else {
            passwordInputRef.current.focus();
        }
    };

    return (
    <Card className={classes.login}>
        <form onSubmit={submitHandler}>
            <Input
                ref={emailInputRef} 
                id={'email'} 
                type={'email'} 
                value={emailState.value}
                label={'E-mail'}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                isValid={emailState.isValid} />
            <Input 
                ref={passwordInputRef} 
                id={'password'} 
                type={'password'} 
                value={passwordState.value}
                label={'password'}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                isValid={passwordState.isValid} /> 
            <div className={classes.actions}>
                <Button type="submit" className={classes.btn}>Login</Button>
            </div>
        </form>
    </Card>
    );
};

export default Login;
