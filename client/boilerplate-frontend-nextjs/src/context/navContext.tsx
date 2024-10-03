'use client'
import {  useState } from "react";

export const NavContext = () => {
  const [navRoute, setNavRoute] = useState<boolean>(false);
  return {
    navRoute,
    setNavRoute
  }
}