import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
  },
  container: {
    marginTop: '7rem',
  },
});

const Upload = ({history}) => {
  const classes = useStyles();
  const {postMedia, loading} = useMedia();

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      fd.append('description', inputs.description);
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      console.log('doUpload', result);
      history.push('/');
    } catch (e) {
      alert(e.message);
    }
  };

  const {
    inputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    setInputs,
  } = useUploadForm(doUpload, {
    title: '',
    description: '',
    file: null,
    dataUrl: '',
  });

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setInputs((inputs) => ({
        ...inputs,
        dataUrl: reader.result,
      }));
    });

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => ({
          ...inputs,
          dataUrl: 'logo512.png',
        }));
      }
    }
  }, [inputs]);

  console.log(inputs);

  return (
    <Grid container className={classes.container} justify="center">
      <Grid item xs={12}>
        <Typography component="h1" variant="h2" gutterBottom align="center">
          Upload
        </Typography>
      </Grid>
      {inputs.dataUrl.length > 0 && (
        <Grid item xs={12} className={classes.root}>
          <img src={inputs.dataUrl} />
        </Grid>
      )}
      <Grid item>
        {!loading ? (
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item className={classes.root}>
                <TextValidator
                  fullWidth
                  name="title"
                  label="Title"
                  value={inputs.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container item className={classes.root}>
                <TextValidator
                  fullWidth
                  name="description"
                  label="Description"
                  value={inputs.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container item className={classes.root}>
                <TextValidator
                  fullWidth
                  type="file"
                  name="file"
                  accept="image/*, audio/*, video/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item className={classes.root}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Lähetä
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
};
Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;
