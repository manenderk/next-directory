"use client";

import MediaPickerComponent from "@/app/components/Media/MediaPickerComponent";
import MediaPreviewComponent from "@/app/components/Media/MediaPreviewComponent";
import { HomeSliderWithImage } from "@/app/models/HomeSliderWithImage";
import { AlertType, ShowAlert } from "@/globals/Alerts/Alert";
import { FileType } from "@/globals/FileTypes";
import { Collapse } from "@mantine/core";
import { HomeSlider } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
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
  });
  const [sliders, setSliders] = useState<HomeSliderWithImage[]>([]);

  const getSliders = async () => {
    try {
      const { data } = await axios.get<HomeSliderWithImage[]>(
        "/api/home-slider"
      );
      setSliders(data);
    } catch (error) {
      ShowAlert("Unable to get sliders", AlertType.Error);
      console.log(error);
    }
  };

  const createHomeSlider = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post<HomeSliderWithImage>(
        "/api/home-slider",
        formFields
      );
      const newSliderData = [...sliders, data];
      newSliderData.sort((a, b) => a.order - b.order);
      setSliders(newSliderData);
      setFormFields({
        id: "",
        title: "",
        description: "",
        link: "",
        imageId: "",
        order: 100,
        active: true,
      });
      setDisplayAddSliderForm(false);
    } catch (error) {
      ShowAlert("Unable to save", AlertType.Error);
      console.log(error);
    }
  };

  const deleteSlider = async (sliderId: string) => {
    try {
      await axios.delete(`/api/home-slider?id=${sliderId}`);
      const newSliderData = sliders.filter((s) => s.id !== sliderId);
      setSliders(newSliderData);
    } catch (error) {
      ShowAlert("Unable to delete", AlertType.Error);
      console.log(error);
    }
  };


  useEffect(() => {
    getSliders();
  }, []);

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
        <form onSubmit={createHomeSlider}>
          <div className="row">
            <div className="col-md-12 mb-4">
              <MediaPickerComponent
                type={FileType.Image}
                onMediaSelected={(media) =>
                  setFormFields({ ...formFields, imageId: media.id })
                }
              />
            </div>
            <div className="col-md-12">
              <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formFields.title ?? ""}
                  onChange={(e) =>
                    setFormFields({ ...formFields, title: e.target.value })
                  }
                />
              </div>
              <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={formFields.description ?? ""}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  className="form-control"
                  value={formFields.link ?? ""}
                  onChange={(e) =>
                    setFormFields({ ...formFields, link: e.target.value })
                  }
                />
              </div>
              <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Order</label>
                <input
                  type="number"
                  className="form-control"
                  value={formFields.order ?? ""}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="slider-active-input"
                  checked={formFields.active ?? false}
                  onChange={(e) =>
                    setFormFields({ ...formFields, active: e.target.checked })
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="slider-active-input"
                >
                  Active
                </label>
              </div>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </Collapse>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Link</td>
                  <td>Order</td>
                  <td>Active</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {sliders.map((slider) => (
                  <tr key={slider.id}>
                    <td>
                      <MediaPreviewComponent media={slider.image} width={100} height={100} />
                    </td>
                    <td>{slider.title}</td>
                    <td>{slider.description}</td>
                    <td>{slider.link}</td>
                    <td>{slider.order}</td>
                    <td>{slider.active ? "Yes" : "No"}</td>
                    <td>
                      <button className="btn btn-danger btn-icon"
                        onClick={() => deleteSlider(slider.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardPageContainer>
  );
};

export default HomeSliderPage;
