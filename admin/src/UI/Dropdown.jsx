//import { useState, useRef } from "react";
import { Link } from "react-router-dom";
//import { CSSTransition } from "react-transition-group";
//import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
//import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { useDispatch } from "react-redux";
import "./dropdown.css";
import { Person } from "@material-ui/icons";
import { logout } from "../redux/userSlice";

const DropdownMenu = () => {
  // const [activeMenu, setActiveMenu] = useState("main");
  // const [menuHeight, setMenuHeight] = useState(null);
  //const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const DropdownMenuItem = (props) => {
    return (
      <Link
        to="#"
        // onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}
        onClick={handleLogout}
        className="menu-item"
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </Link>
    );
  };

  return (
    <div className="dropdown">
      <DropdownMenuItem leftIcon={<Person />} rightIcon={<ChevronIcon />}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem leftIcon={<CogIcon />}>Logout</DropdownMenuItem>
    </div>
  );

  //   const calcHeight = (el) => {
  //     const height = el.offsetHeight;
  //     setMenuHeight(height);
  //   };

  //   return (
  //     <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  //      <CSSTransition
  //        in={activeMenu === 'main'}
  //         timeout={500}
  //         classNames="menu-primary"
  //         unmountOnExit
  //         onEnter={calcHeight}>
  //         <div className="menu">
  //           <DropdownMenuItem
  //             leftIcon={<Person/>}
  //             rightIcon={<ChevronIcon />}
  //             goToMenu="profile">
  //             Profile
  //           </DropdownMenuItem>
  //           <DropdownMenuItem leftIcon={<CogIcon />}>Logout</DropdownMenuItem>
  //         </div>
  //       </CSSTransition>

  //       <CSSTransition
  //         in={activeMenu === 'profile'}
  //         timeout={500}
  //         classNames="menu-secondary"
  //         unmountOnExit
  //         onEnter={calcHeight}>
  //         <div className="menu">
  //           <DropdownMenuItem goToMenu="main" leftIcon={<ArrowIcon />}>
  //             <h2>My Tutorial</h2>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem leftIcon={<BoltIcon />}>HTML</DropdownMenuItem>
  //           <DropdownMenuItem leftIcon={<BoltIcon />}>CSS</DropdownMenuItem>
  //           <DropdownMenuItem leftIcon={<BoltIcon />}>JavaScript</DropdownMenuItem>
  //           <DropdownMenuItem leftIcon={<BoltIcon />}>Awesome!</DropdownMenuItem>
  //         </div>
  //       </CSSTransition>
  //       </div>
  //   );
};

export default DropdownMenu;
