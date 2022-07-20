import Icons from "../common/Icons";
import { Link } from "react-router-dom";
import AdminJPG from "../../assets/images/users/admin.jpg";
import { logout } from "../../redux/actions/auth";
import { useDispatch } from "react-redux/es/exports";

const Header = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <h1>Заголовок страницы</h1>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/widget/engineers">
              <Icons
                name="flame"
                color="#666666"
                size="26"
                className="button-top-panel"
              />
            </Link>
          </li>
          <li>
            <Icons
              name="lightning"
              color="#666666"
              size="26"
              className="button-top-panel"
            />
          </li>
          <li>
            <Icons
              name="dark"
              color="#666666"
              size="26"
              className="button-top-panel"
            />
          </li>
          <li>
            <Icons
              name="user"
              color="#666666"
              size="26"
              className="button-top-panel"
            />
          </li>
          <li>
            <Link to="/login">
              <Icons
                name="entrance"
                color="#666666"
                size="26"
                className="button-top-panel"
              />
            </Link>
          </li>
          <li onClick={logOut}>
              <Icons
                name="entrance"
                color="#666666"
                size="26"
                className="button-top-panel"

              />
          </li>
          <li>
            <div className="admin-profile-link">
              <img src={AdminJPG} alt="Admin" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
