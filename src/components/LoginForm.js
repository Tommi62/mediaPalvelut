/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {Button, makeStyles, TextField} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  fields: {
    marginRight: 20,
  },
});

const LoginForm = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const {postLogin} = useLogin();

  const doLogin = async () => {
    try {
      const userdata = await postLogin(inputs);
      console.log('userdata', userdata);
      localStorage.setItem('token', userdata.token);
      setUser(userdata.user);
      history.push('/home');
    } catch (e) {
      console.log('doLogin', e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useLoginForm(doLogin);

  console.log('LoginForm', inputs, user);

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
      <Button variant="contained" color="primary" type="submit">
        Tallenna
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
