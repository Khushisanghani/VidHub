import React from 'react'
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
const Header = () => {
  return (
    <>
    <Nav fill variant="tabs">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/"><AiOutlineVideoCameraAdd size={25}/> Add Video</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/videos"><BiSolidVideos size={25}/> Show All Videos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/login"><CiLogin size={25}/> Login</Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  )
}

export default Header
