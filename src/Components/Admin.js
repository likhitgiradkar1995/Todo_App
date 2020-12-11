import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Admin() {
    const [users, setUsers] = useState([]);
    const [updatedUser, setupdatedUser] = useState([]);
    //const [isActive, setisActive] = useState(false);

    useEffect(() => {
        refreshUser();
    }, [])

    const refreshUser = () => {
        Axios.get(`http://localhost:1337/user`)
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateUser = (usrId, flag) => {
        console.log("flag", flag);
        console.log("usr id ", usrId);
        Axios.put(`http://localhost:1337/user/${usrId}`, { isActive: flag })
            .then(res => {
                console.log(res.data);
                refreshUser();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usr) => (
                        <tr>
                            <td>{usr.firstName} {usr.lastName}</td>
                            <td>
                                {console.log(usr.isActive)}
                                <button onClick={() => updateUser(usr.id, !usr.isActive)}>{usr.isActive ? "Deactivate" : "Activate"}</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Admin
