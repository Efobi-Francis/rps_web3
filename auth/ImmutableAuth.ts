"use client"

import { config, passport } from '@imtbl/sdk';
import {ImmutableConfiguration} from '@imtbl/sdk/config'

interface PassportModuleConfiguration {
  baseConfig: ImmutableConfiguration;
  clientId: string;
  logoutRedirectUri: string;
  logoutMode?: 'redirect' | 'silent'; // defaults to 'redirect'
  redirectUri: string;
  scope?: string;
  audience?: string;
}

const configuration: PassportModuleConfiguration = {
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX,
  }),
  clientId: process.env.IMMUTABLE_APP_CLIENT_ID as string,
  redirectUri: `http://localhost:3000/callback`,
  logoutRedirectUri: 'http://localhost:3000/',
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
};

const passportInstance = new passport.Passport(configuration)
const provider = passportInstance.connectEvm();

export const getAuthentication = async () => {
    await provider.request({ method: "eth_requestAccounts" })
        .then(accounts => {
            console.log(accounts)
        }).catch(error => {
            console.log(error)
        }).finally( ()=> {
            window.location.reload()
        })

};


export {passportInstance, provider}