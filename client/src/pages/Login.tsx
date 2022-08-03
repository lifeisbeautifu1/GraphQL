import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../mutations/authMutations';
import { ILoginUserData, ILoginUserVars, IErrors } from '../interfaces';

const initialState = {
  username: '',
  password: '',
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IErrors>({} as IErrors);

  const [loginUser, { data }] = useMutation<ILoginUserData, ILoginUserVars>(
    LOGIN_USER,
    {
      onError: (err: any) => {
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: {
        input: formData,
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser();
    if (data) {
      console.log(data);
      navigate('/');
    }
  };

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
              errors?.password && 'border-red-500 placeholder:text-red-500'
            }`}
          />
        </div>

        <button
          className="bg-blue-400 text-white rounded py-2 px-4 self-start
        hover:bg-blue-400/90"
        >
          Login
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="rounded shadow p-4 text-red-500 border-[0.5px] border-red-500">
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
};

export default Register;
