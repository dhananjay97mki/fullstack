import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().min(20).max(60).required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().max(400).required('Address is required'),
  password: yup.string()
    .min(8, '8-16 chars required')
    .max(16, '8-16 chars required')
    .matches(/[A-Z]/, 'Must include uppercase letter')
    .matches(/[\W_]/, 'Must include special character')
    .required('Password is required'),
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/signup', data);
      alert('Signup successful! Please log in.');
    } catch (error) {
      console.error(error);
      alert(
        'Signup failed: ' +
          (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Unknown error'
          )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Full Name" />
      <p>{errors.name?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('address')} placeholder="Address" />
      <p>{errors.address?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Sign Up</button>
    </form>
  );
}
