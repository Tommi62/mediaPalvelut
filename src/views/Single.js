import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '30%',
    margin: 'auto',
  },
  media: {
    height: '50vh',
  },
  container: {
    marginTop: '7rem',
  },
});

const Single = ({location}) => {
  const classes = useStyles();

  const file = location.state;

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom
        align="center"
        className={classes.container}
      >
        {file.title}
      </Typography>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={uploadsUrl + file.filename}
            title={file.title}
          />
          <CardContent>
            <Typography gutterBottom>{file.description}</Typography>
            <Typography variant="subtitle2">{file.user_id}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
