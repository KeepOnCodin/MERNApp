import { Spinner } from 'react-bootstrap'; // This is a special version of the React Router Link component designed for Bootstrap

const Loader = () => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
            }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}