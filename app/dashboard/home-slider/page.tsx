"use client";

import FileInputButtonComponent from "@/app/components/Inputs/FileInputButtonComponent";
import { Collapse } from "@mantine/core";
import { useState } from "react";
import DashboardPageContainer from "../DashboardPageContainer";

const HomeSliderPage = () => {
  const [displayAddSliderForm, setDisplayAddSliderForm] = useState(false);

  return (
    <DashboardPageContainer
      title="Home Slider"
      headerActions={[
        <button
          key={1}
          className="btn btn-light m-0"
          onClick={() => setDisplayAddSliderForm(!displayAddSliderForm)}
        >
          {displayAddSliderForm ? "Hide" : "Add Slider"}
        </button>,
      ]}
    >
      <Collapse in={displayAddSliderForm}>
        <div className="row">
          <div className="col-md-12 mb-4">
            <FileInputButtonComponent onChange={() => {}} accept="image/*" />
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Order</label>
              <input type="number" className="form-control" />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="slider-active-input"
              />
              <label
                className="custom-control-label"
                htmlFor="slider-active-input"
              >
                Active
              </label>
            </div>
          </div>
        </div>
      </Collapse>
    </DashboardPageContainer>
  );
};

export default HomeSliderPage;
