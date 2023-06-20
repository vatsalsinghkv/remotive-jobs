import Input from './Input';
import { getId } from '../../lib/utils/helper';

const Form = ({ className, onChange, inputs, value }) => {
  if (inputs.length === 0) {
    return <p className={className}>No location found!</p>;
  }
  return (
    <form className={className}>
      {inputs.map((input) => (
        <Input
          key={getId()}
          type='radio'
          name='location'
          checked={value === input}
          label={input}
          value={input}
          onChange={onChange}
        />
      ))}
    </form>
  );
};

export default Form;
