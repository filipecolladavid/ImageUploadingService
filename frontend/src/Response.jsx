const Response = ({ error, obj, action }) => {
  if (error) return (
    <>Something went wrong: {error}</>
  )
  else {
    return <>{obj} {action} with success</>;
  }
}

export default Response;