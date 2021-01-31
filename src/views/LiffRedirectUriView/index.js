import React from 'react';
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom"
import liff from "@line/liff";
import { fireStore } from "../../firebase.config"

function LiffRedirectUriView() {
    const [loading, setLoading] = React.useState(true);
    const history = useHistory()
    const auth = useSelector(state => state.auth);
    const parsed = queryString.parse(window.location.search);
    const dispatch = useDispatch();
    console.log(parsed["liff.state"]);
    console.log(auth);
    console.log(history);

    console.log(dispatch);

    React.useEffect(() => {
        const appRef = fireStore.collection("line_apps");
        if (sessionStorage.getItem("liff_id")) {
            liff.init({ liffId: `${sessionStorage.getItem("liff_id")}` }).then(async () => {

                if (liff.isLoggedIn()) {
                    const getProfile = await liff.getProfile();
                    console.log(getProfile);

                    const userId = await appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(getProfile.userId).get();

                    if (!userId.exists) {
                        console.log("No such document!");
                        dispatch({ type: "AUTH_STATUS", payload: false })
                        dispatch({ type: "USER_DISPLAY_NAME", payload: getProfile.displayName });
                        dispatch({ type: "USER_ID", payload: getProfile.userId });
                        dispatch({ type: "USER_PICTURE_URL", payload: getProfile.pictureUrl });
                        await appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(getProfile.userId).set({ ...getProfile })

                    } else {
                        console.log("Document data:", userId.data());
                        console.log("getProfile line:", getProfile);
                        if (userId.data().numberPhone) {
                            dispatch({ type: "AUTH_STATUS", payload: true })
                            dispatch({ type: "USER_DISPLAY_NAME", payload: userId.data().displayName });
                            dispatch({ type: "USER_ID", payload: userId.data().userId });
                            dispatch({ type: "USER_PICTURE_URL", payload: userId.data().pictureUrl });
                            dispatch({ type: "USER_NUMBER_PHONE", payload: userId.data().numberPhone })
                            setLoading(false)
                        } else {
                            dispatch({ type: "AUTH_STATUS", payload: false })
                            dispatch({ type: "USER_DISPLAY_NAME", payload: userId.data().displayName });
                            dispatch({ type: "USER_ID", payload: userId.data().userId });
                            dispatch({ type: "USER_PICTURE_URL", payload: userId.data().pictureUrl });
                            setLoading(false)
                        }
                    }
                } else {
                    dispatch({ type: "AUTH_FIST_PATH", payload: window.location.pathname })

                    liff.login();
                    console.log("a");
                }

            }).catch(err => { throw err });
        } else {
            // setLoading(false)
            console.log("b");
            dispatch({ type: "AUTH_LIFF_ID", payload: parsed.liff_id })
        }
    }, [])

    return (<React.Fragment>
        {/* <Redirect to={`${parsed["liff.state"]}`} /> */}
    </React.Fragment>)
}

export default LiffRedirectUriView