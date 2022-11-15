import React from "react";
import { motion } from "framer-motion";
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

type Props = {
  menuList: MenuList[];
  currentSelectedTab: number;
  handleTab: (arg1?: string, arg2?: number) => void;
  closeNav: boolean;
};

const ButtonMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.96 },
};

const Menu = ({ menuList, handleTab, currentSelectedTab, closeNav }: Props) => {
  return (
    <>
      {(menuList || []).map((link) => {
        return (
          <div key={link.id}>
            <motion.div
              onClick={() => handleTab(link.to, link.id)}
              className={`${
                currentSelectedTab == link.id ? "text-blue" : "text-white"
              } b-700 px-4 p-3 my-3`}
              animate={{ margin: `${closeNav ? "-1.55rem" : "0rem"}` }}
              variants={ButtonMotion}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
              style={{
                fontSize: "1.1rem",
                outline: "1px solid red",
                cursor: "pointer",
                width: "14rem",
              }}
            >
              <link.Icon size={"1.5rem"} className="me-3" />
              {link.title}
            </motion.div>
            {link.subNavItems && currentSelectedTab === link.id ? (
              <motion.div
                className="br-2 p-2"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.328)",
                  width: "13rem",
                }}
              >
                {(link.subNavItems || []).map((subLink) => {
                  return (
                    <motion.div
                      className="p-2 ps-4 text-white br-1 mb-2"
                      onClick={() => handleTab(subLink.to)}
                      variants={ButtonMotion}
                      initial="rest"
                      whileHover="hover"
                      whileTap="pressed"
                      animate={{ scale: 1 }}
                      style={{
                        fontSize: "1.1rem",
                        // outline: "1px solid red",
                        cursor: "pointer",
                        width: "13rem",
                      }}
                    >
                      <link.Icon size={"1.5rem"} className="me-3" />
                      {subLink.title}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Menu;
