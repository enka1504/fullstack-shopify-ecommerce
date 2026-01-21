import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./user.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import Notification from "../../UI/Notification";
import { Fragment } from "react";

export default function User() {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId),
  );

  const handleChange = (event) => {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    updateUser(userId, input, dispatch);
    setNotify({
      isOpen: true,
      message: "Updated Succesfully",
      type: "success",
    });
    history.push("/users");
  };
  return (
    <Fragment>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={
                  user.img
                    ? user.img
                    : "https://firebasestorage.googleapis.com/v0/b/new-shopping-app-d6e85.appspot.com/o/17690066504092.png?alt=media&token=8195725e-fc89-4a9f-8151-a21766e532c1"
                }
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user?.username}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+234 906 633 3575</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowIcon">Is Admin:</span>
                <span className="userShowInfoTitle">{user?.isAdmin}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username"
                    type="text"
                    placeholder={user?.username}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder={user?.fullName}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={user?.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
                <div className="userUpdateItem">
                  <label>IsAdmin?</label>
                  <select name="isAdmin" onChange={handleChange}>
                    <option disabled defaultValue>
                      False
                    </option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={
                      user.img
                        ? user.img
                        : "https://firebasestorage.googleapis.com/v0/b/new-shopping-app-d6e85.appspot.com/o/17690066504092.png?alt=media&token=8195725e-fc89-4a9f-8151-a21766e532c1"
                    }
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}
