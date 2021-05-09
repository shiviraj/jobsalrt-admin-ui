import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import UserContext from './context/UserContext';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme/theme';
import AppRoutes from "./routes/AppRoutes";

const AppRoute = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes/>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default AppRoute;
