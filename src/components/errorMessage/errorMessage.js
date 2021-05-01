import React from 'react';
import styled from 'styled-components';

const ErrorElem = styled.div`
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: red;
`;

const ErrorMessage = () => {
    return (
        <>
            <ErrorElem as='img' src={process.env.PUBLIC_URL + 'img/error-image.png'} alt='error' />
            <ErrorElem>Something goes wrong</ErrorElem>
        </>
    )
}


export default ErrorMessage;