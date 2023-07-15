"use client";
import MediaPickerComponent from "@/app/components/Media/MediaPickerComponent";
import MediaPreviewComponent from "@/app/components/Media/MediaPreviewComponent";
import { ListingCategoryWithImage } from "@/app/models/ListingCategoryWithImage";
import { AlertType, ShowAlert } from "@/globals/Alerts/Alert";
import { FileType } from "@/globals/FileTypes";
import { Collapse } from "@mantine/core";
import { ListingCategory } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import DashboardPageContainer from "../DashboardPageContainer";

const ListingCategoryPage = () => {
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [listingCategories, setListingCategories] = useState<
    ListingCategoryWithImage[]
  >([]);
  const [formFields, setFormFields] = useState<ListingCategory>({
    id: "",
    slug: "",
    title: "",
    thumbnailId: "",
    order: 100,
    active: true,
  });

  const getSliders = async () => {
    try {
      const { data } = await axios.get<ListingCategoryWithImage[]>(
        "/api/listing-categories"
      );
      setListingCategories(data);
    } catch (error) {
      ShowAlert("Unable to get sliders", AlertType.Error);
      console.log(error);
    }
  };

  const createCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post<ListingCategoryWithImage>(
        "/api/listing-categories",
        formFields
      );
      const newCategories = [...listingCategories, data];
      newCategories.sort((a, b) => a.order - b.order);
      setListingCategories(newCategories);
      setFormFields({
        id: "",
        slug: "",
        title: "",
        thumbnailId: "",
        order: 100,
        active: true,
      });
      setDisplayAddForm(false);
    } catch (error) {
      ShowAlert("Unable to save", AlertType.Error);
      console.log(error);
    }
  };

  useEffect(() => {
    getSliders();
  }, []);

  return (
    <DashboardPageContainer
      title="Listing Categories"
      headerActions={[
        <button
          key={1}
          className="btn btn-light m-0"
          onClick={() => setDisplayAddForm(!displayAddForm)}
        >
          {displayAddForm ? "Hide" : "Add Category"}
        </button>,
      ]}
    >
      <Collapse in={displayAddForm}>
        <form onSubmit={createCategory}>
          <div className="row">
            <div className="col-md-12 mb-4">
              <MediaPickerComponent
                type={FileType.Image}
                onMediaSelected={(media) =>
                  setFormFields({ ...formFields, thumbnailId: media.id })
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
                  <td>Order</td>
                  <td>Active</td>
                </tr>
              </thead>
              <tbody>
                {
                  listingCategories.map((category) => (
                    <tr key={category.id}>
                      <td>
                        <MediaPreviewComponent
                          media={category.thumbnail}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>{category.title}</td>
                      <td>{category.order}</td>
                      <td>{category.active ? "Yes" : "No"}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardPageContainer>
  );
};

export default ListingCategoryPage;
