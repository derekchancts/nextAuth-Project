// import { useSession, signIn, signOut } from "next-auth/react"


// const index = () => {
//   const { data: session, status } = useSession()


//   return (
//     <div>index</div>
//   )
// }

// export default index


import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { parseCookies } from "nookies";
import cookie from 'js-cookie';


export default function Component() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState('');

  // console.log({session})
  // console.log({status})

  useEffect(() => {
    const cookies = parseCookies();
    const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
    setCurrentLoggedInUser(user);

    if (!user) router.push("/src/user/login");
  }, [session?.user])
  

  if(currentLoggedInUser) {
    return (
      <>
        Signed in as {currentLoggedInUser.email} <br/>
      </>
    )
  } 

}