import React ,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../stuff/Loader'
import Message from '../stuff/Message'
import {listUsers} from '../../actions/user'
import {deleteUserAction} from '../../actions/user'
const UserScreen = ({history}) => {
    const dispatch=useDispatch()
    const userList=useSelector(state=>state.userList)
    const {loading,error,users}=userList
// user delete action
    const userDelete = useSelector(state => state.userDelete)
    const { loading:loadDelete,error:deleteError,message:deleteMessage } = userDelete
// 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(()=>{
        if(userInfo && userInfo.user.isAdmin){
            dispatch(listUsers(userInfo.user._id))
        }else{
            history.push('/')
        }
    },[dispatch,history,loadDelete])
    const deleteHandler=(id)=>{
        dispatch(deleteUserAction(id))
    }
    return (
       <>
            <h3>Users</h3>
            {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
                <Table striped bordered hover responsive className="label-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ID</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailTo:${user.email}`}>{user.email}</a></td>
                                <td>

                                    {user.isAdmin ? (
                                        <i className='fas fa-check'
                                        style={{color:'green'}}
                                        >
                                        </i>
                                    ):(
                                        <i className='fas fa-check'
                                        style={{color:'red'}}
                                        >
                                        </i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm'
                                    onClick={()=>deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
       </>
    )
}

export default UserScreen
