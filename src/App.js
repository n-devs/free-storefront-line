import React from "react";
import "./App.css";
// import liff from "@line/liff";
import {
  makeStyles
} from "@material-ui/core/styles";
import Loading from "./components/Loading"
import { useSelector, useDispatch } from "react-redux";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { fireStore } from "./firebase.config"
import queryString from "query-string";
import NotFoundLIFFIDView from "./views/NotFoundLIFFIDView"
import SetupView from "./views/SetupView"
import SettingView from "./views/SettingView"
import LiffRedirectUriView from "./views/LiffRedirectUriView"
import AddressView from "./views/AddressView"
import AddProductView from "./views/AddProductView"
import ProductView from "./views/ProductView"

const useStyles = makeStyles((theme) => ({
  avatars: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
    padding: 15,
  },
  layout: {
    padding: "10px 0px"
  },
  app: {
    height: 450
  }
}));

function RunView(props) {
  const auth = useSelector(state => state.auth);
  const parsed = queryString.parse(window.location.search);
  console.log(auth.liff_id);
  return (
    <React.Fragment>
      {auth.liff_id ? (<React.Fragment>
        {auth.status ? (
          <React.Fragment>
            {props.children}
          </React.Fragment>
        ) : (
            <React.Fragment>
              <Redirect to={`/setup?liff_id=${parsed.liff_id}&pathname=${window.location.pathname}`} />
            </React.Fragment>
          )}
      </React.Fragment>) : (<NotFoundLIFFIDView></NotFoundLIFFIDView>)}

    </React.Fragment>
  )
}

function App() {
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const parsed = queryString.parse(window.location.search);
  const auth = useSelector(state => state.auth);

  React.useEffect(() => {
    if (parsed.liff_id) {
      sessionStorage.setItem("liff_id", parsed.liff_id);
      sessionStorage.setItem("fist_path", window.location.pathname);
      dispatch({ type: "AUTH_LIFF_ID", payload: parsed.liff_id })
      dispatch({ type: "AUTH_STATUS", payload: auth.status })
      setLoading(false)
    } else {
      setLoading(false)
      dispatch({ type: "AUTH_LIFF_ID", payload: parsed.liff_id })
    }
  }, [])


  return (
    <div className={classes.app}>
      {loading ? (
        <Loading></Loading>
      ) : (<React.Fragment>
        <Router>
          <TransitionGroup>
            <CSSTransition
              key={window.location.key}
              classNames="fade"
              timeout={300}
            >
              <Switch>
                <Route exact path={`/`}>
                  {sessionStorage.getItem("liff_id") ? (<LiffRedirectUriView></LiffRedirectUriView>) : (<NotFoundLIFFIDView></NotFoundLIFFIDView>)}

                </Route>
                <Route path={`/setup`}>
                  {sessionStorage.getItem("liff_id") ? (<SetupView></SetupView>) : (<NotFoundLIFFIDView></NotFoundLIFFIDView>)}
                </Route>

                <Route path={`/setting`}>
                  <RunView>
                    <SettingView></SettingView>
                  </RunView>
                </Route>
                <Route path={`/address`}>
                  <RunView>
                    <AddressView></AddressView>
                  </RunView>
                </Route>
                <Route path={`/add_product`}>
                  <RunView>
                    <AddProductView></AddProductView>
                  </RunView>
                </Route>
                <Route path={`/products`}>
                  <RunView>
                    <ProductView></ProductView>
                  </RunView>
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Router>
      </React.Fragment>)}
    </div>
  );
}

export default App;
