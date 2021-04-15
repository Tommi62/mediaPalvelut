/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import {useMedia, useTag, useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';

const ProfileForm = ({user}) => {
  const {putUser} = useUsers();
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const validators = {
    confirm: ['isPasswordMatch'],
    email: ['required', 'isEmail'],
    // eslint-disable-next-line max-len
    full_name: [
      "matchRegexp:^[a-zA-ZåäöÅÄÖ]+(([',. -][a-zA-ZåäöÅÄÖ ])?[a-zA-ZåäöÅÄÖ]*)*$",
    ],
  };

  const errorMessages = {
    confirm: ['salasanat eivät täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vain kirjamia siis hei pliis jooko'],
  };

  const doRegister = async () => {
    try {
      console.log('user muokkaus lomake lähtee');
      delete inputs.confirm;
      const result = await putUser(inputs, localStorage.getItem('token'));
      const fd = new FormData();
      fd.append('title', inputs.username);
      fd.append('file', inputs.file);
      const fileResult = await postMedia(fd, localStorage.getItem('token'));
      const tagResult = await postTag(
        localStorage.getItem('token'),
        fileResult.file_id,
        'avatar_' + user.user_id
      );
      console.log('doUpload', fileResult, tagResult);
      if (result && fileResult && tagResult) {
        alert(result.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
  } = useUploadForm(doRegister, user);

  useEffect(() => {
    ValidatorForm.addValidationRule(
      'isPasswordMatch',
      (value) => value === inputs.password
    );
  }, [inputs]);

  // console.log('RegisterForm', inputs);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2" gutterBottom>
          Modify user
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="confirm"
                label="Confirm password"
                onChange={handleInputChange}
                validators={validators.confirm}
                errorMessages={errorMessages.confirm}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs?.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs?.full_name}
                validators={validators.full_name}
                errorMessages={errorMessages.full_name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                fullWidth
                type="file"
                name="file"
                accept="image/*, audio/*, video/*"
                onChange={handleFileChange}
              />
            </Grid>

            <Grid container item>
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileForm;
