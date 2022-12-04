import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NextNProgress from 'nextjs-progressbar';
import React, { useState, useEffect, useCallback } from 'react';
import { GetToken } from '../api';
import { IUser } from '../types/user';
import checkExpirationDateJwt from '../functions/checkExpirationDateJwt';
import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <div className="flex flex-col min-h-[100vh] bg-blue-100">
      {isBrowser ? (
        <>
          <TokenHandler />
          <NextNProgress />
          <Header />
          <main className="my-10 min-h-[80vh]">
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      ) : (
        <div className='flex w-full min-h-[100vh] justify-center items-center'>
          <svg width="150px" height="150px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="bg-none"><defs><clipPath id="cp" x="0" y="0" width="100" height="100"><rect x="0" y="5" width="100" height="46"></rect></clipPath></defs><path d="M70,75.2H34.1l-4.1-18.4l-0.7-3l-1-4.7c0,0,0,0,0-0.1c0-0.1,0-0.1-0.1-0.2c0,0,0-0.1-0.1-0.1c0,0,0-0.1-0.1-0.1 c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0,0,0-0.1-0.1L22.3,44c0-0.1,0-0.2,0-0.3c0-1.9-1.6-3.5-3.5-3.5 s-3.5,1.6-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5c0.7,0,1.4-0.2,2-0.6l4.8,3.7L31.5,77c0,0,0,0,0,0l-5.6,7.7c-0.3,0.5-0.4,1.1-0.1,1.6 c0.3,0.5,0.8,0.8,1.3,0.8h4c-0.8,0.8-1.3,1.9-1.3,3.2c0,2.6,2.1,4.7,4.7,4.7c2.6,0,4.7-2.1,4.7-4.7c0-1.2-0.5-2.3-1.3-3.2h29 c-0.8,0.8-1.3,1.9-1.3,3.2c0,2.6,2.1,4.7,4.7,4.7c2.6,0,4.7-2.1,4.7-4.7c0-1.2-0.5-2.3-1.3-3.2H77c0.8,0,1.5-0.7,1.5-1.5 s-0.7-1.5-1.5-1.5H30l4.3-6h36.8c0.7,0,1.3-0.5,1.4-1.1l7.5-27.3c0.2-0.8-0.2-1.6-1-1.8c-0.8-0.2-1.6,0.2-1.8,1l-1.3,4.7l-0.8,3" fill="#d0d0d0"></path><polygon points="31.3,53.1 35.7,73.2 68.5,73.2 74,53.1" fill="#d0d0d0"></polygon><g clipPath="url(#cp)"><g transform="translate(0 0.833333)"><g transform="translate(50,41)"><path d="M6.5-6.7C6.1-6.9,5.7-7.2,5.3-7.4C5-7.5,4.6-7.7,4.3-7.8C3.1-2.2-4-3.7-2.9-9.3c-0.4,0-0.7,0-1.1,0 c-0.5,0-1,0.1-1.4,0.2c-1.8,0.3-3.6,0.9-5.3,1.8l1.1,4.2l3.1-0.8L-8.7,6.9L3.2,9.3L5.4-1.5l2.5,2l2.7-3.4C9.5-4.4,8.1-5.7,6.5-6.7z" ng-attr-fill="{{c1}}" fill="#e15b64" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(35,17)"><path d="M3.4-5.3L2.5-5l0.8-2.3L1.1-6.3l-1.2-2.2l-1.6,4.6l-4.6-1.6l0.9,2.3l-2.2,1.2l2.3,0.8L-6-0.9 c-0.6,0.3-0.8,0.9-0.5,1.5l1,2.1C-5.2,3.4-4.6,3.6-4,3.3l0.1-0.1l2.1,4.5C-1.4,8.4-0.7,8.7,0,8.3l1.7-0.8l1.7-0.8L5,5.9l1.7-0.8 C7.4,4.8,7.7,4,7.4,3.3L5.2-1.1l0.1-0.1c0.6-0.3,0.8-0.9,0.5-1.5l-1-2.1C4.6-5.4,3.9-5.6,3.4-5.3z" fill="#f47e60" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed2}}s" repeatCount="indefinite" dur="0.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(66,26)"><path d="M-4.5-3.7L1.9-6l0.5-0.2L2-7.2l-6.9,2.5C-5.7-4.4-6.1-3.5-6-2.7c0,0.1,0,0.2,0.1,0.3l3,8.2 C-2.5,6.9-1.3,7.4-0.2,7l5.6-2C5.9,4.8,6.2,4.2,6,3.7L3.2-3.9l-0.4-1L2.4-4.7L1.9-4.5l-3.2,1.2l-2.7,1c-0.3,0.1-0.6,0-0.8-0.2 c-0.1-0.1-0.1-0.1-0.1-0.2C-5.1-3.1-4.9-3.6-4.5-3.7z"  fill="#f8b26a" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(55,6)"><polygon points="0,-4.9 1.6,-1.7 5.1,-1.1 2.6,1.3 3.2,4.9 0,3.2 -3.2,4.9 -2.6,1.3 -5.1,-1.1 -1.6,-1.7" ng-attr-fill="{{c4}}" fill="#abbd81" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></polygon></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed4}}s" repeatCount="indefinite" dur="1.5s"></animateTransform></g></g><g clipPath="url(#cp)"><g transform="translate(0,-75)"><g transform="translate(0 0.833333)"><g transform="translate(50,41)"><path d="M6.5-6.7C6.1-6.9,5.7-7.2,5.3-7.4C5-7.5,4.6-7.7,4.3-7.8C3.1-2.2-4-3.7-2.9-9.3c-0.4,0-0.7,0-1.1,0 c-0.5,0-1,0.1-1.4,0.2c-1.8,0.3-3.6,0.9-5.3,1.8l1.1,4.2l3.1-0.8L-8.7,6.9L3.2,9.3L5.4-1.5l2.5,2l2.7-3.4C9.5-4.4,8.1-5.7,6.5-6.7z" ng-attr-fill="{{c1}}" fill="#e15b64" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed1}}s" repeatCount="indefinite" dur="1.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(35,17)"><path d="M3.4-5.3L2.5-5l0.8-2.3L1.1-6.3l-1.2-2.2l-1.6,4.6l-4.6-1.6l0.9,2.3l-2.2,1.2l2.3,0.8L-6-0.9 c-0.6,0.3-0.8,0.9-0.5,1.5l1,2.1C-5.2,3.4-4.6,3.6-4,3.3l0.1-0.1l2.1,4.5C-1.4,8.4-0.7,8.7,0,8.3l1.7-0.8l1.7-0.8L5,5.9l1.7-0.8 C7.4,4.8,7.7,4,7.4,3.3L5.2-1.1l0.1-0.1c0.6-0.3,0.8-0.9,0.5-1.5l-1-2.1C4.6-5.4,3.9-5.6,3.4-5.3z" ng-attr-fill="{{c2}}" fill="#f47e60" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed2}}s" repeatCount="indefinite" dur="1.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(66,26)"><path d="M-4.5-3.7L1.9-6l0.5-0.2L2-7.2l-6.9,2.5C-5.7-4.4-6.1-3.5-6-2.7c0,0.1,0,0.2,0.1,0.3l3,8.2 C-2.5,6.9-1.3,7.4-0.2,7l5.6-2C5.9,4.8,6.2,4.2,6,3.7L3.2-3.9l-0.4-1L2.4-4.7L1.9-4.5l-3.2,1.2l-2.7,1c-0.3,0.1-0.6,0-0.8-0.2 c-0.1-0.1-0.1-0.1-0.1-0.2C-5.1-3.1-4.9-3.6-4.5-3.7z" ng-attr-fill="{{c3}}" fill="#f8b26a" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></path></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed3}}s" repeatCount="indefinite" dur="1.5s"></animateTransform></g><g transform="translate(0 0.833333)"><g transform="translate(55,6)"><polygon points="0,-4.9 1.6,-1.7 5.1,-1.1 2.6,1.3 3.2,4.9 0,3.2 -3.2,4.9 -2.6,1.3 -5.1,-1.1 -1.6,-1.7" ng-attr-fill="{{c4}}" fill="#abbd81" transform="rotate(8)"><animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" ng-attr-dur="0.25s" repeatCount="indefinite" dur="0.25s"></animateTransform></polygon></g><animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" ng-attr-dur="{{speed4}}s" repeatCount="indefinite" dur="1.5s"></animateTransform></g></g></g></svg>
        </div>
      )}
    </div>
  )
}


const getTokenHandler = async (): Promise<string | undefined> => {
  return await GetToken()
    .then((res) => { return res.data.token })
};


export function TokenHandler() {
  const [user, setUser] = useState<IUser | null>(null)

  const getUser = useCallback(() => {
    const data: IUser | null = JSON.parse(localStorage.getItem("user")! || "null");
    if (data) setUser(data);
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  const [isExpired, setIsExpired] = useState(false);

  const checkErrorAndGetToken = useCallback(async () => {
    const token = await getTokenHandler();
    if (!token) return;
    if (!user) return await getUser();

    let userData: IUser = {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: token
    };

    await localStorage.setItem("user", JSON.stringify(userData));
  }, [getUser, user])


  useEffect(() => {
    checkErrorAndGetToken()
  }, [checkErrorAndGetToken])


  useEffect(() => {
    const interval = setInterval(async () => {
      setIsExpired(checkExpirationDateJwt(user?.token || null));
      if (isExpired) await checkErrorAndGetToken()

    }, 1000 * 50); // every 50 Seconds
    return () => clearInterval(interval);

  }, [checkErrorAndGetToken, isExpired, user?.token])

  return <></>;
}