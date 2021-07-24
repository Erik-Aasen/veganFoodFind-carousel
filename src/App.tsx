import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import { myContext } from './Pages/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import AddMeal from './Pages/AddMeal';
import MyMeals from './Pages/MyMeals';
import AdminPage from './Pages/AdminPage';
import EditMeal from './Pages/EditMeal';

function App() {
  const ctx = useContext(myContext);
  let routes;
  if (ctx) {
    routes = (
      <>
        <Route path='/' exact component={Homepage}></Route>
        {ctx.isAdmin ? (<Route path='/getallusers' exact component={AdminPage}></Route>) : ''}
        <Route path='/profile' exact component={Profile}></Route>
        <Route path='/addmeal' exact component={AddMeal}></Route>
        <Route path='/mymeals' exact component={MyMeals}></Route>
        <Route path='/editmeal' exact component={EditMeal}></Route>
      </>
    )
  } else {
    routes = (
      <>
        <Route path='/' exact component={Homepage}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
      </>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {routes}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
