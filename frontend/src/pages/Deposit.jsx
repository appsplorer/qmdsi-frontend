
import { useParams } from 'react-router-dom';

const Deposit = () => {

  const { id } = useParams();

  
  return (
    <div>{id}</div>
  );
};

export default Deposit;
