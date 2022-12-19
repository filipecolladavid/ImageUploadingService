import "./App.css"

const FormUpload = () => {
  return (
    <div className="left">
      <h3>Upload Image</h3>
      <form>
        <label for="title">Title</label>
        <input id="title" name="title"></input>
        <label for="desc">Description</label>
        <input id="desc" name="desc" height="100px"></input>
        <label for="title">Image</label>
        <input type="file" id="img" name="img"></input>
      </form>
    </div>
  );
}

export default FormUpload;