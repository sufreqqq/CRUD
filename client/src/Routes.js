import TaskPage from "./pages/TaskPage"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Index from "./pages/Index"
import Plans from "./pages/Plans"
import { ADMIN_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, INDEX_ROUTE, TASK_ROUTE, PLANS_ROUTE, TARGETS_ROUTE, PROJECTS_ROUTE } from "./utils/Const"
import Targets from "./pages/Targets"
import Projects from "./pages/Projects"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: DASHBOARD_ROUTE,
        Component: Dashboard
    },
    {
        path: TASK_ROUTE,
        Component: TaskPage
    },
    {
        path: PLANS_ROUTE,
        Component: Plans
    },
    {
        path: TARGETS_ROUTE,
        Component: Targets
    },
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: INDEX_ROUTE,
        Component: Index
    },
]