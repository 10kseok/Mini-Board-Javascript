/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        
        useEffect(() => {
            const token = user.authentication?.accessToken ?? "";
            //To know my current status, send Auth request 
            dispatch(auth(token)).then(response => {
                //Not Loggined in Status 
                if (!response.payload.accessToken) {
                    props.history.push('/login');
                }
            })
            .catch(() => props.history.push('/login'));
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


