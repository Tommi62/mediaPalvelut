import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';

const Single = ({location}) => {
  const file = location.state;

  return (
    <>
      <h1>{file.title}</h1>
      <img src={uploadsUrl + file.filename} alt={file.title} />
    </>
  );
};

Single.propTypes = {
  location: PropTypes.object,
};

export default Single;
