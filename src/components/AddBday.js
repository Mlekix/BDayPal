import React from "react";
import { db, auth } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import * as Yup from "yup";
import { useFormik } from "formik";
import { showToastSuccess, showToastError } from "../config/toast-config";

function AddBday({ getBdayList }) {
  // Bday Collection
  const BdayCollectionRef = collection(db, "bdays");

  // Add New Bday Record
  const newBdayRecord = async () => {
    try {
      if (
        formik.isValid &&
        formik.values.name.trim() !== "" &&
        formik.values.date !== ""
      ) {
        await addDoc(BdayCollectionRef, {
          userId: auth.currentUser.uid,
          name: formik.values.name,
          date: formik.values.date,
        });
        formik.resetForm();
        getBdayList();
        showToastSuccess("Birthday Added Successfully");
      } else {
        showToastError(formik.errors.name || formik.errors.date);
      }
    } catch (err) {
      console.log(err);
      showToastError("Failed to Add Birthday");
    }
  };

  // Formik Schema for Add Bday
  const addBdaySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(15, "Must be 15 characters or less")
      .required("Please enter a name"),
    date: Yup.date().required("Please select a date"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
    },
    validationSchema: addBdaySchema,
    onSubmit: newBdayRecord,
  });

  return (
    <div>
      <input
        className="p-1.5 mr-3 border border-blue-500 rounded-md"
        id="name"
        name="name"
        type="text"
        placeholder="Name of Pal"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <input
        className="p-1.5 border border-blue-500 rounded-md"
        id="date"
        name="date"
        type="date"
        value={formik.values.date}
        onChange={formik.handleChange}
      />
      <br />
      <button
        className="mt-1 p-1 text-green-500 border border-green-500 rounded-md"
        onClick={newBdayRecord}
      >
        Add
      </button>
    </div>
  );
}

export default AddBday;
