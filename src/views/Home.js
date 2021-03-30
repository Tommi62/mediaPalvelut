import {makeStyles, Typography} from '@material-ui/core';
import MediaTable from '../components/MediaTable';

const useStyles = makeStyles({
  root: {
    marginBottom: 50,
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Typography
        className={classes.root}
        component="h1"
        variant="h2"
        gutterBottom
        align="center"
      >
        Home
      </Typography>
      <MediaTable />
    </>
  );
};

export default Home;
