import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../styles/globalStyle";
import { useState } from "react";

const SHeader = styled.div`
  width: 100%;
  max-width: 100%;
  height: 80px;
  padding: ${mainStyle.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: ${(props) => props.bgColor};
  @media screen and (max-width: 500px) {
    padding: ${mainStyle.moPadding};
  }
`;

const Logo = styled.h3`
  font-size: 28px;
  font-weight: 800;
  a {
    color: ${mainStyle.mainColor};
  }
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const MenuWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.li`
  margin-left: 100px;
  font-size: 18px;
  font-weight: 500;
  @media screen and (max-width: 500px) {
    margin-left: 20px;
  }
`;

export const Header = () => {
  const [bg, setBg] = useState("transparent");

  const handelScroll = () => {
    const sct = window.pageYOffset;
    console.log(sct);
    if (sct > 300) {
      setBg("#1d1d1d");
    } else {
      setBg("transparent");
    }
  };

  window.addEventListener("scroll", handelScroll);

  return (
    <SHeader bgColor={bg}>
      <Logo>
        <Link to={"/"}>YJ_MOVIE</Link>
      </Logo>

      <MenuWrap>
        <Menu>
          <Link to={"/"}>Home</Link>
        </Menu>
        <Menu>
          <Link to={"/Search"}>Search</Link>
        </Menu>
      </MenuWrap>
    </SHeader>
  );
};
