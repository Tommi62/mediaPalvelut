/* eslint-disable require-jsdoc */

import {Button, makeStyles, TextField} from '@material-ui/core';
import {useUsers} from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '10%',
  },
  fields: {
    marginBottom: 20,
  },
});

const RegisterForm = () => {
  const {register, getUserAvailable} = useUsers();

  const doRegister = async () => {
    try {
      console.log('Lomake lähtee.');
      const available = await getUserAvailable(inputs.username);
      console.log('Available', available);
      if (available) {
        register(inputs);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);
  // console.log('RegisterForm', inputs);
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        className={classes.fields}
        label="username"
        name="username"
        onChange={handleInputChange}
        value={inputs.username}
      />
      <TextField
        className={classes.fields}
        label="password"
        name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}
      />
      <TextField
        className={classes.fields}
        label="email"
        name="email"
        type="email"
        onChange={handleInputChange}
        value={inputs.email}
      />
      <TextField
        className={classes.fields}
        label="full name"
        name="full_name"
        onChange={handleInputChange}
        value={inputs.full_name}
      />
      <Button variant="contained" color="primary" type="submit">
        Tallenna
      </Button>
    </form>
  );
};

export default RegisterForm;
