/* eslint-disable comma-dangle */
/* eslint-disable indent */
import {useAllMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const picArray = useAllMedia();
  return (
    <table>
      <tbody>
        {picArray.map((item, index) => (
          <MediaRow key={index} file={item} />
        ))}
      </tbody>
    </table>
  );
};

export default MediaTable;
