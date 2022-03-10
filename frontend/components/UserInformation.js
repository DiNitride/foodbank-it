import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

export default function UserInformation() {
  // let { user, isLoading, isError } = useUser()
  // console.log(user)
  // console.log(isLoading)
  // console.log(isError)
  let { data: session, status } = useSession()
  let [userData, setUserData] = useState([])
  // console.log(session)

  useEffect(() => {
    loadData()
  }, [])

  let loadData = async () => {
    let r = await fetch(`/api/users/${session.user.userId}`)
    let user = await r.json()
    setUserData(user)
  }
  
  if (userData) {
    return <div className='m-3 border rounded p-2'>
      <h1>Current User:</h1>
      <p>{ userData.forename } { userData.surname }</p>
      <p>UserID: { userData.userId }</p>
      <p>Email: {userData.email }</p>
    </div>
  } else {
    return <div className='m-3 border rounded p-2'>
      No user data loaded
    </div>
  }
}