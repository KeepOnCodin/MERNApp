import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import Loader from "../components/Loader"

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation(); // used to call the login mutation

    const { userInfo } = useSelector(state => state.auth); // used to get the userInfo from the store

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap(); // call the login mutation from the api slice (makes a request to the backend)
            //unwrap will return a promise with the data if the request is successful and will unwrap the promise
            dispatch(setCredentials({ ...res })); // set the credentials in the store
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.data.error);
        }
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" content="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

            <Form.Group className="my-2" content="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

                {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">
                Sign In
            </Button>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to="/register">Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>     
  )
}

export default LoginScreen;