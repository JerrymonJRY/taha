import React from "react";
import { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from "../layouts/base_url";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
const EditExpenseInvoice = () => {
    const {id} =useParams()
  const [addedby, setuserid] = useState("");
  const [expense, setExpense] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const storeid = localStorage.getItem("_id");
    setuserid(storeid);
  }, []);
  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/expenseinvoice/getexpensecategory`)
      .then((response) => {
        setExpense(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseURL}/api/expenseinvoice/editexpenseinvoice/${id}`)
      .then((response) => {

        const selectedOption = expense.find((category) => category._id === response.data.expenseId);
        setSelectedExpense({
          value: selectedOption ? selectedOption._id : "",
          label: selectedOption ? selectedOption.expensename : "",
        });
        setAmount(response.data.amount)
        setDate(new Date(response.data.date));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleExpenseChange = (selectedOption) => {
    setSelectedExpense(selectedOption);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedExpenseValue = selectedExpense ? selectedExpense.value : null;
  
    const formData = {
      expenseId: selectedExpenseValue,
      amount,
      date,
      addedby,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios
      .put(`${apiConfig.baseURL}/api/expenseinvoice/updateexpensiveinvoice/${id}`, formData, config)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: 'Expense invoice Updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect or perform any other action after the user clicks OK
          navigate("/viewExpenseinvoice");
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the expense invoice.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  

  };
  

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Edit Expense </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Food</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Edit Expense
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="form-group row">
                          <label
                            for="exampleInputUsername2"
                            className="col-sm-3 col-form-label"
                          >
                            Expense Name
                          </label>
                          <div className="col-sm-9">
                          <Select
                              id="expenseSelect"
                              value={selectedExpense}
                              onChange={handleExpenseChange}
                              options={expense.map((category) => ({
                                value: category._id,
                                label: category.expensename,
                              }))}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            for="exampleInputUsername2"
                            className="col-sm-3 col-form-label"
                          >
                            Amount
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              name="amount"
                              value={amount}
                              id="exampleInputUsername2"
                              placeholder="Amount"
                              onChange={(e) => {setAmount(e.target.value)}}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            for="exampleInputUsername2"
                            className="col-sm-3 col-form-label"
                          >
                            Date
                          </label>
                          <div className="col-sm-9">
                          <DatePicker
                              id="datePicker"
                              selected={date}
                              onChange={handleDateChange}
                              dateFormat="MM/dd/yyyy"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-gradient-primary me-2"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default EditExpenseInvoice;
