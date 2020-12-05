import NavLink from '../../components/navLink';
import { PrimaryButton, SecondaryButton } from '../../components/customButton';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/Fa';
import WsAccount from './account';
import { UserContext } from '../../pages/_app';
import React from 'react';
import Router from 'next/router';

const LogInForm = () => {
  const wsAccount = new WsAccount();

  const { user, setUser } = React.useContext(UserContext);

  return (
    <div className='max-w-6xl min-h-full mx-auto py-10 flex items-center'>
      <div className='max-w-lg w-full mx-auto flex flex-col space-y-10 p-2 items-center'>
        <h2 className='font-medium'>Sign in to your account</h2>
        <div className='w-full border border-gray-50 border-opacity-5 rounded-md p-10'>
          <form
            id='loginForm'
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const values: any = Array.from(document.querySelectorAll('#loginForm input')).reduce(
                (acc, input) => ({
                  ...acc,
                  [input.id]: input.value,
                }),
                {}
              );
              console.log(values);

              wsAccount
                ._post('user/login', {
                  account: {
                    email: values.email,
                    password: values.password,
                  },
                })
                .then((userDoc) => {
                  setUser(userDoc);

                  Router.push('/');
                })
                .catch((err) => console.log(err));
            }}
            className='space-y-7'
          >
            <div>
              <span>Email address</span>
              <input
                className='w-full bg-transparent outline-none border-gray-50 border-2 border-opacity-5 rounded-md p-2'
                placeholder='your@email.com'
                type='email'
                id='email'
              />
            </div>

            <div>
              <span>Password</span>
              <input
                className='w-full bg-transparent outline-none border-gray-50 border-2 border-opacity-5 rounded-md p-2'
                type='password'
                id='password'
              />
            </div>

            <div className='md:flex justify-between'>
              <div className='flex items-center space-x-2'>
                <input className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded' type='checkbox' />
                <span className='font-medium'>Remember me</span>
              </div>
              <div>
                <div className='flex items-center space-x-2'>
                  <NavLink className='font-medium text-blue-400' href='' text='Forgot your password?' />
                </div>
              </div>
            </div>

            <div>
              <PrimaryButton type='submit' className='w-full'>
                <span>Sign in</span>
              </PrimaryButton>
            </div>

            <div className='items-center flex flex-col space-y-5'>
              <div className='font-medium flex justify-between w-full items-center'>
                <span className='border border-white border-opacity-5 h-0 w-full'></span>
                <span className='w-full text-center'>Or continue with</span>
                <span className='border border-white border-opacity-5 h-0 w-full'></span>
              </div>
              <div className='flex space-x-5 w-full'>
                <SecondaryButton type='reset' className='w-full'>
                  <FaGoogle className='mx-auto' />
                </SecondaryButton>
                <SecondaryButton type='reset' className='w-full'>
                  <FaGithub className='mx-auto' />
                </SecondaryButton>
                <SecondaryButton type='reset' className='w-full'>
                  <FaFacebook className='mx-auto' />
                </SecondaryButton>
              </div>
              <div className='flex items-center space-x-2'>
                <a>don't have an account?</a>
                <NavLink className='font-medium text-blue-400' href='/signup' text='Create one' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
