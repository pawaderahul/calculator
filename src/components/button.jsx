/* eslint-disable react/prop-types */

const Button = (props) => {
  const { className, onClick, value } = props;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
