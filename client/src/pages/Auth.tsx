import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { REGISTER_USER, LOGIN_USER } from '../mutations/authMutations';
import {
  IRegisterUserData,
  ILoginUserData,
  ILoginUserVars,
  IRegisterUserVars,
  IErrors,
} from '../interfaces';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IErrors>({} as IErrors);

  const [registerUser] = useMutation<IRegisterUserData, IRegisterUserVars>(
    REGISTER_USER,
    {
      onError: (err: any) => {
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      update(_, result) {
        dispatch(login(result?.data?.register!));
        navigate('/');
      },
      variables: {
        input: formData,
      },
    }
  );

  const [loginUser] = useMutation<ILoginUserData, ILoginUserVars>(LOGIN_USER, {
    update(_, result) {
      dispatch(login(result?.data?.login!));
      navigate('/');
    },
    onError: (err: any) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      input: {
        username: formData.username,
        password: formData.password,
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(pathname);
    switch (pathname) {
      case '/login':
        loginUser();

        break;
      case '/register':
        registerUser();
        break;
      default:
        return;
    }
  };
  if (pathname === '/register') {
    return (
      <div className="flex flex-col w-[400px] mx-auto mt-6 gap-6">
        <h1 className="font-bold text-2xl">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div
            className={`flex flex-col gap-1 ${
              errors?.username && 'text-red-500'
            }`}
          >
            <label className="font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`p-2 rounded border border-gray-300 ${
                errors?.username && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <div
            className={`flex flex-col gap-1 ${errors?.email && 'text-red-500'}`}
          >
            <label className="font-bold">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`p-2 rounded border border-gray-300 ${
                errors?.email && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              errors?.password && 'text-red-500'
            }`}
          >
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.password && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>
          <div
            className={`flex flex-col gap-1 ${
              errors?.confirmPassword && 'text-red-500'
            }`}
          >
            <label className="font-bold">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.confirmPassword &&
                'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white rounded py-2 px-4 self-start
        hover:bg-blue-400/90"
          >
            Register
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-4">
              {Object.values(errors).map((error) => (
                <li className="font-semibold" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-[400px] mx-auto mt-6 gap-6">
        <h1 className="font-bold text-2xl">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div
            className={`flex flex-col gap-1 ${
              errors?.username && 'text-red-500'
            }`}
          >
            <label className="font-bold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`p-2 rounded border border-gray-300 ${
                errors?.username && 'border-red-500 placeholder:text-red-500'
              }`}
            />
          </div>

          <div
            className={`flex flex-col gap-1 ${
              errors?.password && 'text-red-500'
            }`}
          >
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`p-2 rounded border border-gray-300 ${
                errors?.password && 'border-red-500 placeholder:text-red-500 '
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white rounded py-2 px-4 self-start
        hover:bg-blue-400/90"
          >
            Login
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="rounded shadow p-4 text-red-500 border-[0.5px] bg-red-100 border-red-500">
            <ul className="flex flex-col gap-2 text-sm list-disc pl-4">
              {Object.values(errors).map((error) => (
                <li className="font-semibold" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default Register;
