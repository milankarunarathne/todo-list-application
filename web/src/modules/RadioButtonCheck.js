import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';

const RadioButtonCheck = ({ isComplete }) => {
  return isComplete ? (
    <MdRadioButtonChecked size="50px" style={{ margin: '6px' }} />
  ) : (
    <MdRadioButtonUnchecked size="50px" style={{ margin: '6px' }}/>
  );
};

export default RadioButtonCheck;
