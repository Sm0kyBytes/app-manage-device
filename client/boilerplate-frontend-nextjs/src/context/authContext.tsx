'use client'

import { useState, useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

export const AuthContext = () => {
  const [name, setName] = useState<string>('5555+');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwt.decode(token) as JwtPayload;
      if (decoded && decoded.userName) {
        setName(decoded.userName);
      }
    }
  }, []);

  return {
    name,
    setName
  }
};
