import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "./Modal";
import uuid from "react-uuid";

export default function Dashboard() {
  const [data, setdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formdata, setFormdata] = useState({
    guid: uuid(),
    name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    eyeColor: "",
    company: "",
    balance: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "http://www.json-generator.com/api/json/get/ceOyzBmZKa?indent=2";
      const result = await Axios.get(
        `http://cors-anywhere.herokuapp.com/${url}`
      ).catch((error) => {
        return error;
      });
      setdata(result.data);
    };
    fetchData();
  }, []);

  const activateModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, guid) => {
    e.preventDefault();

    setdata([...data, formdata]);

    function uniq(a) {
      return a.sort().filter(function (item, pos, ary) {
        return !pos || item !== ary[pos - 1];
      });
    }

    uniq(data);

    setFormdata({
      guid: uuid(),
      name: "",
      gender: "",
      age: "",
      email: "",
      phone: "",
      eyeColor: "",
      company: "",
      balance: "",
    });
    let comparision = data.map((id) => id.guid);
    console.log(comparision);

    setTimeout(closeModal(), 100);
    console.log(edit);
  };

  const handleDeleteRow = (id) => {
    if (data.length > 1) {
      let updatedData = [...data];
      //updatedData.filter((x) => x.guid === id.target.id);
      let rowtoRemove = updatedData.findIndex((x) => x.guid === id.target.id);
      updatedData.splice(rowtoRemove, 1);
      // console.log(updatedData);
      setdata(updatedData);
    } else {
      alert("You cannot delete all the table rows");
    }
  };

  const clearAllData = () => {
    let updatedData = [...data];
    updatedData = [];
    setdata(updatedData);
  };

  const handleEdit = (id) => {
    setEdit(true);
    let updatedData = [...data];
    let rowtoEdit = updatedData.filter((x) => x.guid === id.target.id);
    activateModal();

    setFormdata({
      guid: rowtoEdit[0].guid,
      name: rowtoEdit[0].name,
      gender: rowtoEdit[0].gender,
      age: rowtoEdit[0].age,
      email: rowtoEdit[0].email,
      phone: rowtoEdit[0].phone,
      eyeColor: rowtoEdit[0].eyeColor,
      company: rowtoEdit[0].company,
      balance: rowtoEdit[0].balance,
    });
    let dataAfter = data.filter((removeDup) => removeDup.guid !== id.target.id);
    setdata(dataAfter);

    // if (edit) {
    //   setdata(updatedData);
    // } else {
    //   console.log("edit");
    //   let dataAfter = data.filter(
    //     (removeDup) => removeDup.guid !== id.target.id
    //   );
    //   setdata(dataAfter);
    // }
    // let dataAfter = data.filter((removeDup) => removeDup.guid !== id.target.id);
    // setdata(dataAfter);
  };

  const closeModal = (close) => {
    setIsModalOpen(false);
  };

  const enableClose = () => {
    setEdit(false);
    activateModal();
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formdata={formdata}
          setFormdata={setFormdata}
          closeModal={closeModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          edit={edit}
          setEdit={setEdit}
        />
      ) : null}
      <button
        id='btncustom'
        className='btn btn-danger float-right'
        onClick={clearAllData}
      >
        Delete all entries
      </button>
      <button
        id='btncustom'
        className='btn btn-success float-right'
        onClick={enableClose}
      >
        Add entries
      </button>
      <div className='table-responsive-md'>
        <table className='table table-bordered table-striped'>
          <tbody>
            {data && data.length > 0
              ? data.map((table) => {
                  return (
                    <tr key={table.guid}>
                      <td>{table.name}</td>
                      <td> {table.gender}</td>
                      <td>{table.age}</td>
                      <td>{table.email}</td>
                      <td>{table.phone}</td>
                      <td>{table.eyeColor}</td>
                      <td>{table.company}</td>
                      <td>${table.balance}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          id={table.guid}
                          onClick={(id) => handleDeleteRow(id)}
                        >
                          Delete entry
                        </button>
                        <button
                          className='btn btn-info'
                          id={table.guid}
                          onClick={(id) => handleEdit(id)}
                        >
                          Edit entry
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
