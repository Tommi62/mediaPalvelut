/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import useUploadForm from '../hooks/UploadHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {
  CircularProgress,
  Button,
  Grid,
  Typography,
  makeStyles,
  Slider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useSlider from '../hooks/SliderHooks';

const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
  },
  container: {
    marginTop: '7rem',
  },
  slider: {
    width: '30%',
  },
});

const Upload = ({history}) => {
  const classes = useStyles();
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const validators = {
    title: ['required', 'minStringLength: 3'],
    description: ['minStringLength: 5'],
  };

  const errorMessages = {
    title: ['Vaadittu kenttä!', 'Vähintään kolme merkkiä!'],
    description: ['vähintään 5 merkkiä'],
  };

  const doUpload = async () => {
    try {
      const fd = new FormData();
      fd.append('title', inputs.title);
      const desc = {
        description: inputs.description,
        filters: sliderInputs,
      };
      fd.append('description', JSON.stringify(desc));
      fd.append('file', inputs.file);
      const result = await postMedia(fd, localStorage.getItem('token'));
      const tagResult = await postTag(
        localStorage.getItem('token'),
        result.file_id
      );
      console.log('doUpload', result, tagResult);
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

  const [sliderInputs, handleSliderChange] = useSlider({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
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
  }, [inputs.file]);

  console.log(inputs, sliderInputs);

  return (
    <Grid container className={classes.container} justify="center">
      <Grid item xs={12}>
        <Typography component="h1" variant="h2" gutterBottom align="center">
          Upload
        </Typography>
      </Grid>
      <Grid item xs={6}>
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
                  validators={validators.title}
                  errorMessages={errorMessages.title}
                />
              </Grid>
              <Grid container item className={classes.root}>
                <TextValidator
                  fullWidth
                  name="description"
                  label="Description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={validators.description}
                  errorMessages={errorMessages.description}
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
              {inputs.dataUrl.length > 0 && (
                <>
                  <Grid item xs={12} className={classes.root}>
                    <img
                      src={inputs.dataUrl}
                      style={{
                        filter: `
                        brightness(${sliderInputs.brightness}%)
                        contrast(${sliderInputs.contrast}%)
                        saturate(${sliderInputs.saturate}%)
                        sepia(${sliderInputs.sepia}%)
                        `,
                        maxWidth: '50%',
                        marginLeft: '25%',
                        marginBottom: '2rem',
                        marginTop: '2rem',
                      }}
                    />
                  </Grid>
                  <Grid container direction="column" alignItems="center">
                    <Grid item className={classes.slider}>
                      <Typography>Brightness</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="brightness"
                        value={sliderInputs?.brightness}
                        onChange={handleSliderChange}
                      />
                    </Grid>
                    <Grid item className={classes.slider}>
                      <Typography>Contrast</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="contrast"
                        value={sliderInputs?.contrast}
                        onChange={handleSliderChange}
                      />
                    </Grid>
                    <Grid item className={classes.slider}>
                      <Typography>Saturation</Typography>
                      <Slider
                        min={0}
                        max={200}
                        step={1}
                        name="saturate"
                        value={sliderInputs?.saturate}
                        onChange={handleSliderChange}
                      />
                    </Grid>
                    <Grid item className={classes.slider}>
                      <Typography>Sepia</Typography>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        name="sepia"
                        value={sliderInputs?.sepia}
                        onChange={handleSliderChange}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
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