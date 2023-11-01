"use client"

import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { passportInstance } from '../../auth/ImmutableAuth';

export default function CallbackPage() {
    // const router = useRouter();
    if (typeof window !== 'undefined') {
        window.addEventListener("load", function () {
          passportInstance.loginCallback();
          // return router.push('/select');
        });
    }

}
