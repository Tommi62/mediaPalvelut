/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable max-len */
import {useState, useEffect} from 'react';
import {appIdentifier, baseUrl} from '../utils/variables';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

const useAllMedia = () => {
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(baseUrl + 'tags/' + appIdentifier);
      const files = await response.json();
      // console.log(files);

      const media = await Promise.all(
        files.map(async (item) => {
          const resp = await fetch(baseUrl + 'media/' + item.file_id);
          return resp.json();
        })
      );

      setPicArray(media);
    };

    loadMedia();
  }, []);
  return picArray;
};

const useUsers = () => {
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      console.log(response);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username);
      return response.available;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/user', fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/' + id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {register, getUserAvailable, getUser, getUserById};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  return {postLogin};
};

const useMedia = () => {
  const [loading, setLoading] = useState(false);
  const postMedia = async (fd, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: fd,
    };
    try {
      const response = await doFetch(baseUrl + 'media', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('Upload failed');
    } finally {
      setLoading(false);
    }
  };
  return {postMedia, loading};
};

const useTag = () => {
  const postTag = async (token, id, tag = appIdentifier) => {
    const data = {
      file_id: id,
      tag,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'tags', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('Tagging failed');
    }
  };

  return {postTag};
};

export {useAllMedia, useUsers, useLogin, useMedia, useTag};
