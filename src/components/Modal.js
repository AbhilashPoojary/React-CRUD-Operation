import React from "react";

export default function Modal({
  formdata,
  closeModal,
  handleChange,
  handleSubmit,
  edit,
  setEdit,
}) {
  let checkEdit = () => {
    if (edit) {
      alert("you cant close the modal on edit mode");
    } else {
      closeModal();
    }
  };
  return (
    <div className='modal fade'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Add details in the form</h5>
            <button type='button' className='close' onClick={checkEdit}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => handleSubmit(e, formdata.guid)}>
              <input
                className='w-100'
                name='name'
                value={formdata && formdata.name}
                onChange={handleChange}
                placeholder='enter name'
              />
              <input
                className='w-100'
                name='gender'
                value={formdata && formdata.gender}
                onChange={handleChange}
                placeholder='enter gender'
              />
              <input
                className='w-100'
                name='age'
                value={formdata && formdata.age}
                onChange={handleChange}
                placeholder='enter age'
              />
              <input
                className='w-100'
                name='email'
                value={formdata && formdata.email}
                onChange={handleChange}
                placeholder='enter email'
              />
              <input
                className='w-100'
                name='phone'
                value={formdata && formdata.phone}
                onChange={handleChange}
                placeholder='enter phone'
              />
              <input
                className='w-100'
                name='eyeColor'
                value={formdata && formdata.eyeColor}
                onChange={handleChange}
                placeholder='enter eyeColor'
              />
              <input
                className='w-100'
                name='company'
                value={formdata && formdata.company}
                onChange={handleChange}
                placeholder='enter company'
              />
              <input
                className='w-100'
                name='balance'
                value={formdata && formdata.balance}
                onChange={handleChange}
                placeholder='enter balance'
              />
              <button type='submit' className='btn btn-secondary'>
                submit
              </button>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={checkEdit}
            >
              Close
            </button>
            {/* <button type='button' className='btn btn-primary'>
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
