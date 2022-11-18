import React from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap"
import {  BASE_URL } from '../../features/settings'
import UpdateUser from './UpdateUser'
import AddUserToCourse from './AddUserToCourse';
import AddStudentToCourse from './AddStudentToCourse';

const UserMangement = () => {
    const [users, setUsers] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [state, setState] = React.useState<'updateUser'| 'addUserToCourse'| "addStudentToCourse">()
    const [currentSelectedUser, setCurrentSelectedUser] = React.useState()
    const [currentSelectedUserRole, setCurrentSelectedUserRole] = React.useState<'1', '2'>()
    let token = localStorage.getItem("token")

    const [error, setError] = React.useState("")

    const getListOfUser = React.useCallback(() => {
        if(token) {
            const headers = {
                Authorization: `token ${token}`
            }
            axios.get(`${BASE_URL}/master/user-management/`, {headers})
                .then(res => {
                    setUsers(res.data.users)
                    console.log(res.data.users)
                    setCourses(res.data.courses)
                    console.log(res.data.courses)
                }).catch(err => {
                    if(err.response) {
                        setError(err.response.statusText)
                    } else if(err.request) {
                        setError(err.request)
                    } else {
                        setError(err)
                    }
                })
        }
    }, [])

    React.useEffect(() => {
        getListOfUser()
    }, [getListOfUser])

    if(state === 'updateUser') {
        return <UpdateUser {...{setState, currentSelectedUser, setError, currentSelectedUserRole}} />
    } else if (state === 'addUserToCourse') {
        return <AddUserToCourse {...{setState, currentSelectedUser, setError, currentSelectedUserRole}} />
    } else if (state === "addStudentToCourse") {
        return <AddStudentToCourse {...{setState, currentSelectedUser, setError, currentSelectedUserRole}} />
    }

    // 1 means patient/user
    // 2 means doctor/staff
    return <div className='container'>
        <h1>users</h1>
        <div>
        {(users.users || []).map(user =><div key={user._id}>
            <p>{user.name}</p>
            <Button onClick={() => {setState("updateUser"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("1")}}>update</Button>
            <Button onClick={() => {setState("addUserToCourse"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("1")}}>update user to course</Button>
            <Button onClick={() => {setState("addStudentToCourse"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("1")}}>Update student to course</Button>

        </div>)}
        </div>
        <h1>doctors</h1>
        <div>
        {(users.doctors || []).map(user =><div key={user._id}>
            <p>{user.name}</p>
            <Button onClick={() => {setState("updateUser"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("2")}}>update</Button>
            <Button onClick={() => {setState("addUserToCourse"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("2")}}>update user to course</Button>
            <Button onClick={() => {setState("addStudentToCourse"); setCurrentSelectedUser(user); setCurrentSelectedUserRole("2")}}>update student to course</Button>
        </div>)}
        </div>
    </div>
}

export default UserMangement;