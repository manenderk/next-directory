"use client";
import { useRef } from "react";

const AddMediaComponent = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        className="btn btn-light m-0"
        onClick={() => {
          if (ref.current) {
            ref.current.click();
          }
        }}
      >
        Add
      </button>
      <input type="file" name="medias" ref={ref} className="d-none" multiple />
    </>
  );
};

export default AddMediaComponent;
