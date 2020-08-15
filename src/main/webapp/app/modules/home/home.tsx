import './home.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Row, Col, Alert, Table } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const [value, setValue] = useState(0);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2a6a9e',
      },
      secondary: {
        main: '#fff',
      },
    },
  });

  const useStyles = makeStyles(themeMerlion => ({
    root: {
      backgroundColor: '#2a6a9e',
      color: 'lightgray',
    },
    tabs: {
      color: 'rgba(255,255,255,0.5)',
    },
  }));

  const classes = useStyles(props);

  const handleChange = (num: number) => {
    setValue(num);
  };

  return (
    <Container>
      {account && account.login ? (
        <div>
          <Paper className={`${classes.root}`}>
            <ThemeProvider theme={theme}>
              <Tabs value={value} indicatorColor="secondary" textColor="secondary" aria-label="tabs">
                <Tab className={`${classes.tabs}`} label="Encargados" onClick={() => handleChange(0)} />
                <Tab className={`${classes.tabs}`} label="Enviados" onClick={() => handleChange(1)} />
                <Tab className={`${classes.tabs}`} label="Entregados" onClick={() => handleChange(2)} />
              </Tabs>
            </ThemeProvider>
          </Paper>
        </div>
      ) : (
        <div>
          <Alert color="warning">
            <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
            <Link to="/login" className="alert-link">
              <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
            </Link>
            <Translate contentKey="global.messages.info.authenticated.suffix">
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
            </Translate>
          </Alert>

          <Alert color="warning">
            <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
            <Link to="/account/register" className="alert-link">
              <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
            </Link>
          </Alert>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
