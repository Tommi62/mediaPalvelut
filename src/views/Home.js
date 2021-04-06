import {Grid, makeStyles, Typography} from '@material-ui/core';
import MediaTable from '../components/MediaTable';

const useStyles = makeStyles({
  root: {
    marginBottom: 50,
  },
  container: {
    marginTop: '7rem',
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container} justify="center">
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
      </Grid>
    </>
  );
};

export default Home;
