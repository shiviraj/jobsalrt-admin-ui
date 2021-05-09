import {createMuiTheme} from '@material-ui/core/styles';
import {blue, deepPurple} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[600],
    },
    secondary: {
      main: blue[600],
    },
  },
});

export default theme;
