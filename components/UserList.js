import { useEffect, useState } from "react";

export default function UserList() {
  let [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  let loadUsers = async () => {
    let r = await fetch('/api/users')
    let users = await r.json()
    setUsers(users)
  }

  return <div className='m-2 p-2 border rounded'>
    <h1 className='text-xl m-2'>Users registered on System</h1>
    <table className='border'>
      <thead className="border">
        <tr>
          <th className='border p-1'>UserID</th>
          <th className='border p-1'>Forename</th>
          <th className='border p-1'>Surname</th>
          <th className='border p-1'>Email</th>
        </tr>
      </thead>
      <tbody>
        { users.map((user) => {
          return (
            <tr> key={user.UserId}
              <td className='border p-1'>{ user.userId }</td>
              <td className='border p-1'>{ user.forename }</td>
              <td className='border p-1'>{ user.surname }</td>
              <td className='border p-1'>{ user.email }</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}
