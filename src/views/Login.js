import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, makeStyles} from '@material-ui/core';
import {useState} from 'react';

const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const classes = useStyles();

  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className={classes.container}>
        {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
        <Button className={classes.root} onClick={showHide}>
          {toggle ? 'or register' : 'or login'}
        </Button>
      </div>
    </>
  );
};

export default Login;
