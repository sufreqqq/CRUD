import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputMask from 'react-input-mask'

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/Const';
import { login, registration } from '../http/userAPI';
import { Context } from '../index'
import NavBar from '../components/NavBar/NavBar';

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    
    const click = async () => {
    try {
        if (isLogin){
            const response = await login(number, password)
            console.log(response)
        } else {
            const response = await registration(number, password)
            console.log(response)
        }
        user.setUser(user)
        user.setIsAuth(true)
        navigate(DASHBOARD_ROUTE)
    } catch (e) {
        alert(e.response.data.message)
    }
        
    }
    
    return (
    <>
        <NavBar></NavBar>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <InputMask
                        className="mt-3"
                        placeholder="Введите номер телефона"
                        mask="+7 (999) 999-99-99"
                        value={number}
                        style={{padding: "5px"}}
                        onChange={e => setNumber(e.target.value)}
                    />
                    <InputMask
                        className="mt-3"
                        placeholder="Введите пароль"
                        value={password}
                        style={{padding: "5px"}}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Row className="d-flex mt-3">
                        <Col xl={7}>
                            {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйся!</NavLink>
                            </div>}
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button style={{background: "#3C91E6"}} onClick={click}>
                                {isLogin ? "Войти" : "Зарегистрироваться"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
        </>
    )
}

export default Auth