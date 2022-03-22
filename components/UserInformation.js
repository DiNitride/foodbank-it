import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

export default function UserInformation({ user }) {
  if (user) {
    return <div className='m-3 border rounded p-2'>
      <h1>Current User:</h1>
      <p>{ user.UserForename } { user.UserSurname }</p>
      <p>ID: { user.UserId }</p>
      <p>Account Type: { user.type }</p>
    </div>
  } else {
    return <div className='m-3 border rounded p-2'>
      No user data provided
    </div>
  }
}