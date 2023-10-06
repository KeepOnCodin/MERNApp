import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify";
import {setCredentials} from "../slices/authSlice";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({ ...res }));
            } catch (err) {
                toast.error(err?.data?.message || err.data.error);
            }
        }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" content="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /></Form.Group>

            <Form.Group className="my-2" content="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /></Form.Group>

            <Form.Group className="my-2" content="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /></Form.Group>

            <Form.Group className="my-2" content="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /></Form.Group>

                {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">
                Sign Up
            </Button>

            <Row className="py-3">
                <Col>
                    Already have an account? <Link to="/login">Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>     
  )
}

export default RegisterScreen;