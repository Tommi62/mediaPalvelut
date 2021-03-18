import {useState, useEffect} from 'react';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch('test.json');
      const files = await response.json();
      console.log(files);
      setPicArray(files);
    };

    loadMedia();
  }, []);

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
