import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Link} from 'react-router-dom';
import {Grid, makeStyles, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const MediaRow = ({file}) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.root} lg="4">
      <Paper elevation="4" className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Link
              to={{
                pathname: '/single',
                state: file,
              }}
            >
              <img
                className={classes.img}
                src={uploadsUrl + file.thumbnails?.w160}
                alt={file.title}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {file.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {file.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
