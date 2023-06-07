import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Confirmation Page</h2>
      <p>Reservation ID: {id}</p>
      {/* Render the confirmation details */}
    </div>
  );
};

export default Confirmation;
