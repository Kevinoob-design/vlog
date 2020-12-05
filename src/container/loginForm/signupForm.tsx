import NavLink from '../../components/navLink';
import { PrimaryButton, SecondaryButton } from '../../components/customButton';
import { FaGoogle, FaGithub, FaFacebook, FaSpinner } from 'react-icons/Fa';
import WsAccount from './account';
import { UserContext } from '../../pages/_app';
import React from 'react';
import Router from 'next/router';

const LogInForm = () => {
  const wsAccount = new WsAccount();

  const { user, setUser } = React.useContext(UserContext);

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='max-w-lg w-full mx-auto flex flex-col space-y-10 p-2 items-center'>
        <h2 className='font-medium'>Create your new account</h2>
        <div className='w-full border border-gray-50 border-opacity-5 rounded-md p-10'>
          <form
            id='signupForm'
            action='/'
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              const values: any = Array.from(document.querySelectorAll('#signupForm input')).reduce(
                (acc, input) => ({
                  ...acc,
                  [input.id]: input.value,
                }),
                {}
              );

              if (values.password !== values.confirmPassword) return;

              wsAccount
                ._post('user/singup', {
                  firstName: values.name,
                  lastName: values.lastname,
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
              <span>Name</span>
              <input
                className='w-full bg-transparent outline-none border-gray-50 border-2 border-opacity-5 rounded-md p-2'
                placeholder='John'
                type='text'
                id='name'
              />
            </div>

            <div>
              <span>Last name</span>
              <input
                className='w-full bg-transparent outline-none border-gray-50 border-2 border-opacity-5 rounded-md p-2'
                placeholder='Doe'
                type='text'
                id='lastname'
              />
            </div>

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

            <div>
              <span>Confirm password</span>
              <input
                className='w-full bg-transparent outline-none border-gray-50 border-2 border-opacity-5 rounded-md p-2'
                type='password'
                id='confirmPassword'
              />
            </div>

            <div>
              <PrimaryButton type='submit' className='w-full'>
                <span className='ml-5'>Sign in</span>
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
                <NavLink className='font-medium text-blue-400' href='/login' text='Go back to login page' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
