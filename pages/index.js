import React, { useEffect } from 'react';
import Router from 'next/router';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (
      user &&
      user.reloadUserInfo.screenName !== undefined &&
      user.reloadUserInfo.screenName !== ''
    ) {
      Router.push(`/edit/${user.reloadUserInfo.screenName}`);
    }
  }, [user]);

  return (
    <div className='hero min-h-screen min-w-full bg-base-200'>
      <div className='hero-content w-80 sm:w-96 text-center'>
        <div className='card w-full  max-w-md shadow-2xl bg-base-100'>
          <div className='card-body'>
            <h1 className='text-5xl font-bold'>gm Stash</h1>
            <p className='py-6'>
              Sign in with Twitter below, Mind you, Your Twitter username will
              be your link <br />
              <br /> Let&#39;s make you a profile that shows how bullish you are
              in Web 3, WAGMI
            </p>
            <div className='form-control mt-4'>
              <button
                className='btn hover:bg-slate-300 bg-gray-50 text-black normal-case'
                onClick={() => signIn()}
              >
                <svg
                  viewBox='0 0 24 24'
                  className='mr-3 h-6 w-6 text-blue-400'
                  fill='currentColor'
                >
                  <g>
                    <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
                  </g>
                </svg>
                Sign in with Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
