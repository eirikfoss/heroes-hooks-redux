import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroById, setHero, updateHero } from "../hero-actions";

export default function EditHero(params) {
  /*part of Redux pattern*/
  const dispatch = useDispatch();
  const { hero, isLoading } = useSelector(state => state.heroReducer);

  /*basic React*/
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    dispatch(fetchHeroById(params.id));
  }, []);

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedHero = { ...hero };
    const { name, value } = input;
    updatedHero[name] = value;
    dispatch(setHero(updatedHero));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(await updateHero(hero));
    setIsSuccess(!isSuccess);
  };

  const handleBackButton = () => {
  window.history.back();
  };

  return (
    <>
      <h2>Edit Hero</h2>
         {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple"
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
      <div className="card my-3" style={{ width: "auto" }}>
        <form className="card-header" onSubmit={handleSubmit}>
          <section className="d-flex flex-row">
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={hero.firstName}
                onChange={handleInputChange}
                type="text"
                id="firstName"
                className="form-control"
              />
            </div>
            <div className="mt-3 ml-3 input-width">
              <label>Last Name</label>
              <input
                name="lastName"
                value={hero.lastName}
                onChange={handleInputChange}
                type="text"
                id="lastName"
                className="form-control"
              />
            </div>
          </section>
          <label className="mt-3">House</label>
          <input
            name="house"
            value={hero.house}
            onChange={handleInputChange}
            type="text"
            id="house"
            className="form-control"
          />
          <label className="mt-3">Known as</label>
          <input
            name="knownAs"
            value={hero.knownAs}
            onChange={handleInputChange}
            type="text"
            id="knownAs"
            className="form-control"
          />
          <button
            type="submit"
            disabled={isSuccess}
            className="btn btn-info mt-3"
          >
            Update
          </button>
          <button
            onClick={handleBackButton}
            type="button"
            className="btn btn-outline-secondary mt-3 ml-3"
          >
            Back
          </button>
        </form>
      </div>)}
      {isSuccess && (
        <div className="alert alert-success col-md-3" role="alert">
          This hero has been updated!
        </div>
      )}
    </>
  );
}
