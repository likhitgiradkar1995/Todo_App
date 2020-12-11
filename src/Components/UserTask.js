import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserTask(props) {
    const [posts, setPosts] = useState([])
    const [task, setTask] = useState({ title: '', description: '', userId: '' })
    const [updateFlag, setUpdateFlag] = useState(false)
    const [taskId,setTaskId]=useState('');

    useEffect(() => {
        console.log("props location user id",props.location.state);

        axios.get(`http://localhost:1337/user/${props.location.state}`)
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
                //setUser({userId:'5fceeaa034b00e26801c44a7'})
            })
            .catch(err => {
                console.log(err)
            })
    }, [task])

    const addUser = (e) => {
        //alert(user.description);
        //e.preventDefault();
        console.log("update flag >>",updateFlag)
        if(updateFlag)
        {
         axios.put(`http://localhost:1337/task/${taskId}`,{title:task.title,description:task.description})
         .then(res=>{
             console.log("update task res",res.data);
         })
        }else{
            console.log("task", task);
            axios.post(`http://localhost:1337/addTask`, { title:task.title,description:task.description,userId:task.userId })
                .then(res => {
                    console.log("add task res", res);
                    console.log(res.data);
                })
        }
    }

    function btnDeleteclick(id) {
        console.log(id)
        axios.delete(`http://localhost:1337/task/${id}`)
            .then(res => {
                console.log("delete task res", res);
                console.log(res.data);
            })
    }

    function btnEditclick(t) {
        setTask({
            title: t.title,
            description: t.description,
            userId: t.userId
        });
        setUpdateFlag(true);
        setTaskId(t.id);
    }

    return (
        <div>
            <form onSubmit={addUser}>
                <div>
                    Enter title:
         <input type='text' value={task.title} required onChange={e => setTask({ ...task, title: e.target.value })} />
                </div>
                <div>
                    Enter description:
         <input type='text' value={task.description} required onChange={e => setTask({ ...task, description: e.target.value })} />
                </div>

                <div>
                    <button type='submit'>submit</button>
                </div>
            </form>


            <table className="table">
                <thead>
                    <tr>
                        <th>title</th>
                        <th>desciption</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(post =>
                            post.tasks.map(p =>
                                <tr>
                                    <td>{p.title} </td>
                                    <td>{p.description}</td>
                                    <td>
                                        <button onClick={() => btnEditclick(p)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => btnDeleteclick(p.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                            // <tr>
                            //     <td>{post.tasks.title} </td>
                            //     <td>{post.tasks.description}</td>
                            // </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

        // <ul>
        //     {
        //         posts.map(post =>
        //             <li>{post.title} {post.description}</li>
        //         )
        //     }
        // </ul>
    )
}

export default UserTask
