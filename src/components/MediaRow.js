import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Link} from 'react-router-dom';

const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={uploadsUrl + file.thumbnails.w160} alt={file.title} />
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <Link
          to={{
            pathname: '/single',
            state: file,
          }}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
