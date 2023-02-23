import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import {
  AiOutlineTool,
  AiOutlineLogout,
  AiOutlineAccountBook,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineComment,
  AiOutlineFire,
  AiOutlineFileProtect,
  AiOutlineCalculator,
  AiOutlineSend,
  AiOutlineClose,
  AiOutlineNotification,
  AiOutlinePercentage,
  AiOutlineSafety,
  AiOutlineMenu,
} from "react-icons/ai";
import { logout } from "../../features/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import logo from "../../assets/white-logo.png";

import "./SideNav.scss";
import { IconType } from "react-icons";

interface MenuList {
  id: number;
  Icon: IconType;
  title: string;
  to?: string;
  subNavItems?: {
    Icon: IconType;
    title: string;
    to: string;
  }[];
}

const TopNav = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuList, setMenuList] = React.useState<MenuList[]>();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const patientsMenu: MenuList[] = [
    {
      id: 1,
      Icon: AiOutlineUser,
      title: "Dashboard",
      to: "/",
    },
    {
      id: 2,
      Icon: AiOutlineFire,
      title: "My courses",
      to: "/courses",
    },
    {
      id: 3,
      title: "My certification",
      Icon: AiOutlineFileProtect,
      to: "/certification",
    },

    // {
    //   id: 3,
    //   Icon: AiOutlineNotification,
    //   title: "Webinars",
    //   to: "/webinars",
    // },

    // {
    //   id: 4,
    //   Icon: AiOutlineComment,
    //   title: "Community",
    //   to: "/Forum",
    // },
    {
      id: 6,
      Icon: AiOutlineShopping,
      title: "Cart",
      to: "/cart",
    },
  ];

  const superUserMenu: MenuList[] = [
    {
      id: 1,
      Icon: AiOutlineUser,
      title: "Dashboard",
      to: "/",
    },
    {
      id: 13,
      Icon: AiOutlineAccountBook,
      title: "Analytics",
      to: "/analytics",
    },
    {
      id: 2,
      Icon: AiOutlineFire,
      title: "Curriculum",
      to: "/courses",
    },
    {
      id: 3,
      title: "Certification",
      Icon: AiOutlineFileProtect,
      to: "/certification",
    },
    // {
    //   id: 3,
    //   Icon: AiOutlineNotification,
    //   title: "Webinars",
    //   to: "/webinars",
    // },
    {
      id: 4,
      Icon: AiOutlineShopping,
      title: "Cart",
      to: "/cart",
    },
    {
      id: 5,
      Icon: AiOutlineUser,
      title: "Users",
      to: "/userMangement",
    },
    {
      id: 6,
      Icon: AiOutlineFire,
      title: "Courses",
      to: "/coursesMangement",
    },
    {
      id: 7,
      Icon: AiOutlineNotification,
      title: "Topics",
      to: "/topicsMangement",
    },
    {
      id: 8,
      Icon: AiOutlinePercentage,
      title: "Assessment",
      to: "/assessmentMangement",
    },
    {
      id: 9,
      Icon: AiOutlineTool,
      title: "Questions",
      to: "/questionMangement",
    },
    {
      id: 10,
      Icon: AiOutlineSafety,
      title: "Badges",
      to: "/badgeMangement",
    },
    {
      id: 11,
      Icon: AiOutlineComment,
      title: "Certification",
      to: "/certificationMangement",
    },
    {
      id: 12,
      Icon: AiOutlineSend,
      title: "Events",
      to: "/eventMangement",
    },
  ];

  React.useEffect(() => {
    const userState = localStorage.getItem("userState");
    if (userState) {
      if (userState === "SuperUser" || userState === "staffMember") {
        setMenuList(superUserMenu);
      } else {
        setMenuList(patientsMenu);
      }
    }
  }, []);

  if (!open) {
    return (
      <div
        className="header bg-primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          padding: "1rem 2rem",
          zIndex: "1",
        }}
      >
        <img src={logo} width="100rem" />
        <span onClick={() => setOpen(true)}>
          <AiOutlineMenu color="white" style={{ fontSize: "2rem" }} />
        </span>
      </div>
    );
  } else {
    return (
      <div
        className="nav_container bg-primary"
        style={{
          padding: "1rem",
          transition: "all .3s",
          zIndex: "150",
          position: "sticky",
          top: 0,
          width: open ? "100%" : "0%",
          bottom: 0,
        }}
      >
        <div
          className="header bg-primary"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            padding: "1rem",
          }}
        >
          <img src={logo} width="150rem" />
          <span onClick={() => setOpen(false)}>
            <AiOutlineClose color="white" style={{ fontSize: "2rem" }} />
          </span>
        </div>
        <div
          style={{
            height: "100%",
            marginTop: "1rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          {menuList?.map((menu) => {
            return (
              <span
                key={menu.id}
                onClick={() => {
                  navigate(menu.to || "/");
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  marginBottom: ".8rem",
                  cursor: "pointer",
                  color: "white",
                  padding: ".5rem 0rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <menu.Icon
                  color="white"
                  style={{
                    fontSize: "1.6rem",
                    marginRight: "1rem",
                    marginTop: "-1rem",
                  }}
                />
                <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {menu.title}
                </p>
              </span>
            );
          })}
        </div>
        <Button
          onClick={logoutHandler}
          style={{
            width: "100%",
            padding: "1rem",
            background: "white",
            color: "black",
            fontWeight: "bold",
            marginTop: "1rem",
            fontSize: "1rem",
          }}
        >
          Log Out
        </Button>
      </div>
    );
  }
};

export default TopNav;
