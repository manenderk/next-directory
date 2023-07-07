"use client";

import MediaPickerComponent from "@/app/components/Media/MediaPickerComponent";
import { FileType } from "@/globals/FileTypes";
import { Collapse } from "@mantine/core";
import { HomeSlider } from "@prisma/client";
import { useState } from "react";
import DashboardPageContainer from "../DashboardPageContainer";

const HomeSliderPage = () => {
  const [displayAddSliderForm, setDisplayAddSliderForm] = useState(false);
  const [formFields, setFormFields] = useState<HomeSlider>({
    id: "",
    title: "",
    description: "",
    link: "",
    imageId: "",
    order: 100,
    active: true,
  })

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
            <MediaPickerComponent
              type={FileType.Image}
              onMediaSelected={(media) => setFormFields({...formFields, imageId: media.id})}
            />
          </div>
          <div className="col-md-12">
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" 
                value={formFields.title || ""}
                onChange={(e) => setFormFields({...formFields, title: e.target.value})}
              />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" 
                value={formFields.description || ""}
                onChange={(e) => setFormFields({...formFields, description: e.target.value})}
              />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" 
                value={formFields.link || ""}
                onChange={(e) => setFormFields({...formFields, link: e.target.value})}
              />
            </div>
            <div className="input-group input-group-dynamic mb-4">
              <label className="form-label">Order</label>
              <input type="number" className="form-control" 
                value={formFields.order || ""}
                onChange={(e) => setFormFields({...formFields, order: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="slider-active-input"
                checked={formFields.active}
                onChange={(e) => setFormFields({...formFields, active: e.target.checked})}
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
