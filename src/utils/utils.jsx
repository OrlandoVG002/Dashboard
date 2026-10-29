import { Alert, Spinner } from 'react-bootstrap';


export const todayDate = () => {
    return new Date().toISOString().split('T')[0]
};

export const loadingScreen = () => {
    return(
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
        </div>
    )
};

export const errorScreen = ({error}) => {
    return(
        <div className="d-flex justify-content-center align-items-center">
            <Alert variant="danger" className="m-3">{error}</Alert>
        </div>
    )
}