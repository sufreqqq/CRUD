import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import { Context } from '../../index'
import {INDEX_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, REGISTRATION_ROUTE} from '../../utils/Const'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
  const {user} = useContext(Context)
  
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.clear()
}
  return (
  <>
          {user.isAuth ?
            <>
            <div class="nav">
        <div class="container">
            <div class="nav-wrapper">
                <div class="logo">
                <NavLink to={INDEX_ROUTE}><a href='/'><img src="/logo.svg" alt=""/></a></NavLink>
                </div>
                <div class="links">
                    <NavLink onClick={() => logOut()}>Выйти</NavLink>
                    <NavLink to={DASHBOARD_ROUTE}><Button>Панель управления</Button></NavLink>
                </div>
            </div>
        </div>
    </div>
            </>
            :
            <>
            <div class="nav">
        <div class="container">
            <div class="nav-wrapper">
                <div class="logo">
                <NavLink to={INDEX_ROUTE}><a href='/'><img src="/logo.svg" alt=""/></a></NavLink>
                </div>
                <div class="links">
                <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                <NavLink to={REGISTRATION_ROUTE}><Button>Начать</Button></NavLink>
                </div>
            </div>
        </div>
    </div>
            </>
          }
    </>
  )
})

// const NavBar = observer(() => {
//   const {user} = useContext(Context)
//   const navigate = useNavigate()
  
//   const logOut = () => {
//     user.setUser({})
//     user.setIsAuth(false)
//     localStorage.clear()
// }
//   return (
//   <>
//     <Navbar bg="transparent" className="" variant="dark">
//         <Container >
//           <NavLink style={{color: "white", textDecoration: "none"}} to={INDEX_ROUTE}>CRUDTM</NavLink>
//           {user.isAuth ?
//             <Nav>
//               <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Админ-панель</Button>
//               <Button variant={'outline-light'} style={{marginLeft: "10px"}}  onClick={() => logOut()} className="ml-4">Выйти</Button>
//             </Nav>
//             :
//           <NavLink to={LOGIN_ROUTE} className="ml-auto">
//               <Button variant={'outline-dark'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
//           </NavLink>
//           }
//         </Container>
//       </Navbar>
//     </>
//   )
// })

export default NavBar