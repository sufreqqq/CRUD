import React from 'react'
import '../components/main.css'
import { useEffect, useContext  } from "react";
import "../components/main.css"
import NavBar from '../components/NavBar/NavBar';
import Button from '../components/Button/Button';
import { DASHBOARD_ROUTE, REGISTRATION_ROUTE } from '../utils/Const';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import NavLink from 'react-bootstrap/esm/NavLink';

const Index = () => {
  const {user} = useContext(Context)
  useEffect(() => {
    document.body.classList.add("background");
    return () => {
      document.body.classList.remove("background");
    };
  }, []);
  return (
    <>
    <NavBar></NavBar>
    <div className="main">
    <h1 class="linear-wipe">Организуйте<br/> работу и жизнь.</h1>
    <p class="linear-wipe">CRUD - менеджер задач</p>
    <span class="linear-wipe">Он поможет вам в решении ваших задач<br/> 
    и выставлении их приоритетности</span>
    {user.isAuth 
    ? 
    <Link to={DASHBOARD_ROUTE}><Button style={{margin: "25px auto", width: "250px"}}>Панель управления</Button></Link>
    :
    <Link to={REGISTRATION_ROUTE}><Button style={{margin: "25px auto", width: "150px"}}>Начать</Button></Link>
    }
    <div class="dashboard">
    <img src="/dashboard.png" alt=""/>
    <div class="dashboard-img">
      <img src="/Dashboard_Dark.png" alt=""/></div>
    </div>
    </div>
    </>
  )
}

export default Index