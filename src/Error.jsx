import './Error.css';

function Error(props) {

    console.log(props)

    return (
        <div className="error m-0 d-flex align-items-center justify-content-center">
            <div className="text-white">{props.message}</div>
        </div>
    );
}

export default Error;