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

const MyFiles = () => {
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
          My files
        </Typography>
        <MediaTable ownFiles={true} />
      </Grid>
    </>
  );
};

export default MyFiles;
