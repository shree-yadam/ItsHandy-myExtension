import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap";
import "./NavBar.scss";
import logo from "../images/ourlogo123.png";
export default function NavBar({ currentUser, setCurrentUser }) {
  const history = useHistory();
  function handleLogout(event) {
    console.log("Logout");
    history.push("/");
    axios
      .post("/api/users/logout")
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => console.log("Error: ", err));
  }

  return (
    <nav className="navbar-menu">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="pic not found" />
        </Link>

        {/* <img href = "./images/ourlogo.png" alt="icon-img"></img> */}
      </div>

      {!currentUser && (
        <div className="navbar-items-container-1">
          <div className="user-action-nav">
            <Button
              className="navbar-items"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              className="navbar-items"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </div>
        </div>
      )}
      {currentUser && (
        <div className="navbar-items-container">
          <div className="navbar-items-container-1">
            {!currentUser.is_provider && (
              <>
                <Button
                  onClick={() =>
                    history.push(`/client/${currentUser.id}/requests/new`)
                  }
                >
                  {" "}
                  Request Form{" "}
                </Button>
                <Button
                  className="navbar-items"
                  onClick={() => history.push(`/client/${currentUser.id}`)}
                >
                  Dashboard
                </Button>
              </>
            )}
            <div className="navbar-items-container">
              {currentUser.is_provider && (
                <Button
                  className="navbar-items"
                  onClick={() => history.push(`/provider/${currentUser.id}`)}
                >
                  Dashboard
                </Button>
              )}
            </div>
          </div>
          <div className="user-action-nav">
            <Button className="navbar-items" onClick={handleLogout}>
              Logout
            </Button>

            <h3>
              <i>{currentUser.first_name} {currentUser.last_name}</i>
            </h3>
          </div>
        </div>
      )}
    </nav>
  );
}
