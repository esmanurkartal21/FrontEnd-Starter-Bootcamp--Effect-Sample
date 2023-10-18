import axios from "axios";
import React, { useEffect, useState } from "react";

function SuppliersPage() {
  const [suppliers, setsuppliers] = useState([]);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = () => {
    axios.get("https://northwind.vercel.app/api/suppliers").then((res) => {
      setsuppliers(res.data);
    });
  };

  const deleteSuppliers = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      axios
        .delete("https://northwind.vercel.app/api/suppliers/" + id)
        .then((res) => {
          loadSuppliers();
        });
    }
  };

  return (
    <>
      <h1>Suppliers Lenght: {suppliers.length}</h1>
      <table className="w3-table w3-striped ">
        <thead>
          <tr className="w3-dark-gray">
            <th>Id</th>
            <th>Company Name</th>
            <th>Contact Name</th>
            <th>Contact Title</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {suppliers &&
            suppliers.map((item) => {
              return (
                <tr className="w3-hover-pale-red">
                  <td>{item.id}</td>
                  <td>{item.companyName}</td>
                  <td>{item.contactName}</td>
                  <td>{item.contactTitle}</td>
                  <td>
                    <button
                      className="w3-red"
                      onClick={() => deleteSuppliers(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default SuppliersPage;
