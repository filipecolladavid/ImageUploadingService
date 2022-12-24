import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"

const ResponseValidation = ({ error, type }) => {
  return (
    !error ?
      <>{type} with success<AiFillCheckCircle color="green" size={40} /></> :
      <>{error}<AiFillCloseCircle color="red" size={40} /> </>
  );
}

export default ResponseValidation;