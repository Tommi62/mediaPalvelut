import MediaRow from "./MediaRow";
import PropTypes from "prop-types";

const MediaTable = ({picArray}) => {
  return (
    <table>
      <tbody>
        {
          picArray.map((item, index) => (<MediaRow key={index} file={item} />))
        }
      </tbody>
    </table>
  );
};

MediaTable.propTypes = {
  picArray: PropTypes.array.isRequired,
};

export default MediaTable;
