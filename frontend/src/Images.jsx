import { useState } from "react";
import GridImages from "./GridImages";

const Images = () => {

  const [loading, setLoading] = useState(true)  
  return (
    <div className="right">
    {loading ? <>Loading...</> : <GridImages />}
    </div>
  );
}

export default Images;