import { useEffect, useState } from "react";
import classes from "./ImageFile.module.css";

const ImageFile = ({ onChange }) => {
  const [id, setId] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [imgTag, setImgTag] = useState(null);

  const buildImgTag = () => {
    let imgTag = null;
    if (imageURI !== null)
      imgTag = (
        <div className={classes.row}>
          <div className="small-9 small-centered columns">
            <img className="thumbnail" src={imageURI} alt="thumbnail" />
          </div>
        </div>
      );
    return imgTag;
  };

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    readURI(e); // maybe call this with webworker or async library?
    if (onChange !== undefined) onChange(e); // propagate to parent component
  };

  useEffect(() => {
    setImgTag(buildImgTag());
  }, []);

  return (
    <div>
      <label htmlFor={id} className={classes.button}>
        Upload an image
      </label>
      <input
        id={id}
        type="file"
        onChange={handleChange}
        className={classes.showForSR}
      />
      {imgTag}
    </div>
  );
};

export default ImageFile;
