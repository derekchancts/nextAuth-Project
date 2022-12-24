// import { useSession, signIn, signOut } from "next-auth/react"


// const index = () => {
//   const { data: session, status } = useSession()


//   return (
//     <div>index</div>
//   )
// }

// export default index


import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { parseCookies } from "nookies";
import cookie from 'js-cookie';

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../store/authSlice'
import { toast } from "react-toastify";
import axios from 'axios'


import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";


export default function Component({ session }) {
  const router = useRouter();
  // const { data: session, status } = useSession();

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState('');

  // console.log({session})
  // console.log({status})

  // useEffect(() => {
  //   const cookies = parseCookies();
  //   const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "";
  //   setCurrentLoggedInUser(user);

  //   if (!user) router.push("/src/user/login");
  // }, [session?.user, router])


  //! if use redux
  const dispatch = useDispatch(); 
  // const user = useSelector(state => state.auth.currentUser)
  const user = useSelector(selectCurrentUser)


  useEffect(() => {
    if (!user) router.push("/src/user/login");

    setCurrentLoggedInUser(user);
  }, [user, router])



  const emailReset = async () => {
    let config = { headers: { "Content-Type": "application/json" } };

    try {
      // console.log({user})
      const { data } = await axios.post('/api/user/emailReset', { user }, config);

      // if (data.error) {
      //   toast.error(data.error.message)
      //   return
      // }

      toast.success(data.success);
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.error);
    }
  };


  return (
    <>
      {currentLoggedInUser && (
        // <>
        //   <Typography component="h1" variant="h5">
        //     Dashboard
        //   </Typography>
        //   {`Logged in as: ` + currentLoggedInUser?.email}
        // </>

        <>
        <Typography component="h1" variant="h5">
          {currentLoggedInUser.name}
        </Typography>
        <Typography component="h1" variant="h5">
          {currentLoggedInUser.email}
        </Typography>
        <Typography component="h1" variant="h5">
          {currentLoggedInUser.validEmail && " "}
          {currentLoggedInUser.validEmail === "not" && (
            <Button onClick={emailReset}>Click here to Verify Email Address</Button>
          )}

          {/* {
            (currentLoggedInUser.validEmail =
              (currentLoggedInUser.validEmail === "not") ? (
                <Button onClick={emailReset}>
                  Click here to Verify Email Address
                </Button>
              ) : (
                " "
              ))
          } */}

        </Typography>
      </>
      )}
    </>
  )

}



export const getServerSideProps = async(context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}