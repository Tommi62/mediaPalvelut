/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button, makeStyles} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';

const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
  },
});

const RegisterForm = ({setToggle}) => {
  const {register, getUserAvailable} = useUsers();
  const classes = useStyles();
  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength:5'],
    confirm: ['required', 'isPasswordMatch'],
    email: ['required', 'isEmail'],
    // eslint-disable-next-line max-len
    full_name: [
      "matchRegexp:^[a-zA-ZåäöÅÄÖ]+(([',. -][a-zA-ZåäöÅÄÖ ])?[a-zA-ZåäöÅÄÖ]*)*$",
    ],
  };

  const errorMessages = {
    username: ['vaadittu kenttä', 'vähintään 3 merkkiä', 'tunnus ei oo vapaa'],
    password: ['vaadittu kenttä', 'vähintään 5 merkkiä'],
    confirm: ['vaadittu kenttä', 'salasanat eivät täsmää'],
    email: ['vaadittu kenttä', 'sähköposti väärää muotoa'],
    full_name: ['vain kirjamia siis hei pliis jooko'],
  };

  const doRegister = async () => {
    try {
      console.log('rekisteröinti lomake lähtee');
      const available = await getUserAvailable(inputs.username);
      console.log('availabale', available);
      if (available) {
        delete inputs.confirm;
        const result = await register(inputs);
        if (result.message.length > 0) {
          alert(result.message);
          setToggle(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, {
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await getUserAvailable(value);
          console.log('onk vapaana', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      console.log('tarkistus', value, inputs.password);
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });
  }, [inputs]);

  // console.log('RegisterForm', inputs);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={3}>
        <Typography component="h1" variant="h2" gutterBottom>
          Register
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container alignItems="center" alignContent="center">
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={validators.username}
                errorMessages={errorMessages.username}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
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
                value={inputs.confirm}
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
                value={inputs.email}
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
                value={inputs.full_name}
                validators={validators.full_name}
                errorMessages={errorMessages.full_name}
              />
            </Grid>

            <Grid container item>
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
                className={classes.root}
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

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
