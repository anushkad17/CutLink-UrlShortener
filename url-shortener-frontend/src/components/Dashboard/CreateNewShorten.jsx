import React, { useState } from 'react';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: '',
      customUrl: '',
    },
    mode: 'onTouched',
  });

  const createShortUrlHandler = async (formData) => {
    setLoading(true);
    try {
      const payload = {
        originalUrl: formData.originalUrl,
        ...(formData.customUrl?.trim() && { customUrl: formData.customUrl.trim() }),
      };

      const { data: res } = await api.post('/api/urls/shorten', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
      await navigator.clipboard.writeText(shortenUrl);
      toast.success('Short URL Copied to Clipboard', {
        position: 'bottom-center',
        className: 'mb-5',
        duration: 3000,
      });

      if (refetch) await refetch();
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Create ShortURL Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >
        <h1 className="font-montserrat text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Create New Shorten URL
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <TextField
          label="Enter Original URL"
          required
          id="originalUrl"
          placeholder="https://example.com"
          type="url"
          message="URL is required"
          register={register}
          errors={errors}
        />

        <TextField
          label="Custom URL (optional)"
          id="customUrl"
          placeholder="e.g. my-custom-link"
          message="Only letters, numbers, dashes allowed"
          register={register}
          pattern={{
            value: /^[a-zA-Z0-9-]*$/,
            message: 'Only letters, numbers and dashes are allowed',
          }}
          errors={errors}
        />

        <button
          className="bg-customRed font-semibold text-white w-32 bg-custom-gradient py-2 transition-colors rounded-md my-3"
          type="submit"
        >
          {loading ? 'Loading...' : 'Create'}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2"
            >
              <RxCross2 className="text-slate-800 text-3xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default CreateNewShorten;
