"use client"

import { useState, useEffect } from 'react'
import {passportInstance} from '../../auth/ImmutableAuth'

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect( ()=> {
        const checkAuth = async () => {
          try {
            const isAccessToken = await passportInstance.getAccessToken()
            console.log(isAccessToken)
            if (isAccessToken === undefined) {
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
          }
        };
    
        checkAuth();
    }, [])

    return {isAuthenticated}
}
