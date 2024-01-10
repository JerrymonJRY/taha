import React from "react";
import { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import apiConfig from "../layouts/base_url";

const ImportFoodCategory = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("csvFile", file);

        const config = { headers: { "Content-Type": "multipart/form-data"}};

        try {
            const response = await axios.post(`${apiConfig.baseURL}/api/foodcategory/importfoodcategory`, formData, config);
            const { importedFoodmenu, duplicateFoodmenu } = response.data;
        if (importedFoodmenu) {
                // Show success message with SweetAlert2 and redirect
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Food Category imported successfully.',
                }).then(() => {
                    navigate('/viewfoodcategory');
                });
            } else if (duplicateFoodmenu) {
                // Show SweetAlert2 message for duplicate food menu
                Swal.fire({
                    icon: 'warning',
                    title: 'Duplicate Food Category',
                    text: 'This food menu already exists.',
                });
            } else {
                // Handle other cases as needed
            }

        } catch (error) {
            // Handle error, you can customize this based on your API response
            console.error(error);

            // Show error message with SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };


    const handleDownloadSample = async () => {
        try {
            const response = await fetch("/downloadcsv/foodcategory.csv");
            const csvData = await response.text();

            const blob = new Blob([csvData], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "sample-foodmenu.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title"> Import Food Category </h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Food</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Import Foodmenu
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
                                                        Import Food Category
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            name="csvFile"
                                                            id="exampleInputUsername2"
                                                            accept=".csv"
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-3">

                                                </div>
                                                <div className="col-sm-9">
                                                    <button
                                                        type="button"
                                                        className="btn btn-gradient-info me-2"
                                                        onClick={handleDownloadSample}
                                                    >
                                                        Download Sample CSV
                                                    </button>
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

export default ImportFoodCategory;
