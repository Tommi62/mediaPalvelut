/* eslint-disable comma-dangle */
/* eslint-disable indent */
import {Grid, makeStyles} from '@material-ui/core';
import {useAllMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const MediaTable = () => {
  const picArray = useAllMedia();
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      spacing={2}
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      {picArray.map((item, index) => (
        <MediaRow key={index} file={item} />
      ))}
    </Grid>
  );
};

export default MediaTable;
