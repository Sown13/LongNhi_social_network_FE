import {Navigate, Route} from "react-router-dom";

export default function PrivateRoute({element: Component, role, loggedIn,user, ...rest}) {
    return (
        <Route
            {...rest}
            element={loggedIn && user.role === role ? (
                Component
            ) : (
                <Navigate to="/login" replace/>
            )}
        >
        </Route>
    );
}