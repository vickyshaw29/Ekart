import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loader from '../stuff/Loader'
import { getUserDetails } from '../../actions/user'
import FormContainer from './FormContainer'
import { Button, Form } from 'react-bootstrap'
import { updateUserActionByAdmin } from '../../actions/user'
const EditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setname] = React.useState("")
    const [email, setemail] = React.useState("")
    const [isAdmin, setisAdmin] = React.useState(false)
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    // just getting the token from the userlogin state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // 
    // update user data from the store
    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const { error: updateError, success, loading: updateLoading, message } = userUpdateAdmin
    // 
    console.log(user, 'from the userscreen')
    useEffect(() => {
        if (!user || user._id !== userId) {
            dispatch(getUserDetails(userId, userInfo.token))
        } else {
            setname(user.name)
            setemail(user.email)
            setisAdmin(user.isAdmin)
        }
    }, [user,success])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserActionByAdmin(
            user._id,
            {
                name: name || undefined,
                email: email || undefined,
                isAdmin: isAdmin || undefined
            }))
    }
    return (
        <>
            {updateLoading ? <Loader />  : (
                <>
                {/* {success?<Message variant="success">User Updated</Message>:""} */}
                    <Link to='/admin/userlist' className="btn btn-light my-3">Go Back</Link>
                    <FormContainer>
                        <h1>Edit User</h1>
                        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name">
                                    <Form.Label>
                                        Name
                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>
                                        Email Address
                    </Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="isAdmin">
                                    <Form.Check
                                        type="checkbox"
                                        label="isAdmin"
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={(e) => setisAdmin(e.target.checked)}
                                    >

                                    </Form.Check>
                                </Form.Group>



                                <Button
                                    type="submit" variant="primary"
                                >
                                    Update
                    </Button>
                            </Form>
                        )}
                    </FormContainer>
                </>
            )}

        </>

    )
}

export default EditScreen
