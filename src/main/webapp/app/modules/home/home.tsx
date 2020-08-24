import './home.scss';

import React, { useState, useEffect } from 'react';
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
import TableProducts from './components/tableProducts';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const [value, setValue] = useState(0);
  const [salesList, setSalesList] = useState([]);

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

  const useStyles = makeStyles({
    root: {
      backgroundColor: '#2a6a9e',
      color: 'lightgray',
    },
    tabs: {
      color: 'rgba(255,255,255,0.5)',
    },
    button: {
      backgroundColor: '#2a6a9e',
      color: 'white',
      '&:hover': {
        backgroundColor: '#5E99C5',
      },
    },
  });

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    let token = '';
    axios({ url: window.location.href + 'api/authenticate' })
      .then(response => (token = response.config.headers.Authorization))
      .catch(error => console.error(error));
    const apiUrl = window.location.href + 'api/sales';
    if (mounted) {
      axios({
        url: apiUrl,
        method: 'GET',
        headers: {
          accept: '*/*',
          Authorization: token,
        },
      })
        .then(response => setSalesList(response.data.sort((a, b) => a.id - b.id)))
        .catch(error => {
          console.error(error);
        });
    }
    return () => (mounted = false);
  }, []);

  const handleChange = (num: number) => {
    //  Change tab panel
    setValue(num);
  };

  const handleUpdate = saleUpdated => {
    //  Update local sales list
    const index = salesList.map(s => s.id).indexOf(saleUpdated.id);
    const list = [...salesList];
    list[index] = saleUpdated;
    setSalesList(list);
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
          <TabPanel value={value} index={0}>
            <TableProducts
              styles={classes}
              state="IN_CHARGE"
              list={salesList.filter(sale => sale.state === 'IN_CHARGE')}
              handleUpdate={saleUpdate => handleUpdate(saleUpdate)}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableProducts
              styles={classes}
              state="SHIPPED"
              list={salesList.filter(sale => sale.state === 'SHIPPED')}
              handleUpdate={saleUpdate => handleUpdate(saleUpdate)}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TableProducts styles={classes} state="DELIVERED" list={salesList.filter(sale => sale.state === 'DELIVERED')} />
          </TabPanel>
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
