import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';

const RadioButtonCheck = ({ completed }) => {
  return completed ? (
    <MdRadioButtonChecked size="50px" style={{ margin: '6px' }} />
  ) : (
    <MdRadioButtonUnchecked size="50px" style={{ margin: '6px' }} />
  );
};

export default RadioButtonCheck;
