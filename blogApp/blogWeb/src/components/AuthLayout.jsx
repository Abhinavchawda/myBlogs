import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {

    const authSataus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(authentication && authSataus === false) {
            navigate("/login")
        }
        else if(!authentication && authSataus === true) {
            navigate("/")
        }

        setLoader(false)
    }, [authSataus, authentication, navigate])
    return (loader) ? null : <>{children}</>
}

export default Protected