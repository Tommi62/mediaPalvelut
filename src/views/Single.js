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
import {useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

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
  const [owner, setOwner] = useState(null);
  const classes = useStyles();
  const {getUserById} = useUsers();

  const file = location.state;
  const desc = JSON.parse(file.description);

  useEffect(() => {
    (async () => {
      setOwner(await getUserById(localStorage.getItem('token'), file.user_id));
    })();
  }, []);

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
            style={{
              filter: `
              brightness(${desc.filters.brightness}%)
              contrast(${desc.filters.contrast}%)
              saturate(${desc.filters.saturate}%)
              sepia(${desc.filters.sepia}%)
              `,
            }}
          />
          <CardContent>
            <Typography gutterBottom>
              {JSON.parse(file.description).description}
            </Typography>
            <Typography variant="subtitle2">{owner?.username}</Typography>
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
