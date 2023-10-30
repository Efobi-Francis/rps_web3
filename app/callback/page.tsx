"use client"

import React, {useEffect} from 'react'
import { passportInstance } from '../../auth/ImmutableAuth';

export default function CallbackPage() {
    window.addEventListener("load", function () {
        passportInstance.loginCallback();
    });
}
