import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios'
import {  BASE_URL } from '../../features/settings'

// type = 1
//user_id, email, firstname, role: "1 -> patient" , "2 -> doctor/staff", user_type : 1-pa, 2-staff


// type 2
//user_id,  email, firstname, course: id,  user_type : 1-pa, 2-staff



const UpdateUser = ({setState, currentSelectedUser, setError, currentSelectedUserRole}) => {
    const [data, setData] = useState({
        firstname: currentSelectedUserRole === '1' ? currentSelectedUser.firstname : currentSelectedUser.Name,
        email: currentSelectedUser.Email,
        role: currentSelectedUserRole,
        user_type: currentSelectedUserRole,
    })
    
    console.log(currentSelectedUser)
    let token = localStorage.getItem("token")
    
    const updateUserHandler = () => {
        if(token) {
            const headers = {
                Authorization: `token ${token}`
            }

            const formData = new FormData()
            formData.append("user_id", currentSelectedUser._id)
            formData.append("email", data.email)
            formData.append("role", data.role)
            formData.append("user_type", data.user_type)
            formData.append("type", "1")
            axios.post(`${BASE_URL}/master/user-course-update/`, formData, {headers},)
                .then(res => {
                console.log(res)
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
    }

    const inputChangeHandler = (e) => {
        setData(p => ({...p, [e.target.name]: e.target.value}))
    }

    return <div>
         <Button onClick={() => setState(undefined)}>Back</Button>
        <h1>update User {currentSelectedUser.name}</h1>
        <input placeholder='firstname' name="firstname" value={data.firstname} onChange={inputChangeHandler}></input>
        <input placeholder='email' name="email" value={data.email} onChange={inputChangeHandler}></input>
        <input placeholder='role' name="role" value={data.role} onChange={inputChangeHandler}></input>
        <input placeholder='users Type' name="user_type" value={data.user_type} onChange={inputChangeHandler}></input>
        <Button onClick={updateUserHandler}>Update User</Button>
    </div>
}

export default UpdateUser