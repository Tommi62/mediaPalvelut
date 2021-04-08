import {useState} from 'react';

const useSlider = (initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleInputChange = (event, value) => {
    if (event.target.previousElementSibling?.name) {
      setInputs((inputs) => ({
        ...inputs,
        [event.target.previousElementSibling?.name]: value,
      }));
    }
  };

  return [inputs, handleInputChange];
};

export default useSlider;
