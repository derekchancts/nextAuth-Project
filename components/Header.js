import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { parseCookies } from "nookies";
import cookie from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import { useDispatch } from "react-redux";
import { setUser } from '../store/authSlice'



export default function ButtonAppBar() {
  const dispatch = useDispatch(); 

  const router = useRouter();
  const [currentUser, setcurrentUser] = useState('');
  // console.log({ currentUser })

  const { data: session } = useSession();
  // console.log({session})

  const cookies = parseCookies();
  // console.log({ cookies })


  useEffect(() => {
    const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "";
    setcurrentUser(user);

    dispatch(setUser(user))  //! if you decide to use redux
  }, [cookies.user, session])


  const logoutHandler = () => {
    if (session) signOut()
    
    cookie.remove('token');
    cookie.remove('user');

    // LOGIC HERE TO UPDATE REDUX STATE
    // dispatch(logoutUser);

    // toast.success('Logout success 👌');
    router.push('/src/user/login')
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            // color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link href="/" passHref>
              <HomeIcon sx={{ color: "white" }} />
            </Link>
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentUser && <p> user: {currentUser.email} </p>}
          </Typography>

          <Box sx={{ ml: 2 }}>
            {currentUser || session ? (
              <>
                <Button color="inherit" onClick={() => logoutHandler()}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/src/user/login" passHref style={{ textDecoration: 'none' }} >
                  <Button sx={{ color: 'white'}}>Login</Button>
                </Link>
                <Link href="/src/user/register" passHref style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white'}}>Register</Button>
                </Link>
              </>
            )}
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}