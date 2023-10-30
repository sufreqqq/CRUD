import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';




const App = observer(() => { 
  
  return (
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>
  );
})

export default App;
