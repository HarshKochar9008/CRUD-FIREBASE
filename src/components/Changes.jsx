import { Formik, Field, Form, ErrorMessage } from "formik";
import Modal from "./Modal";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Changes = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, { ...contact, isFavorite: false });
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Error adding contact");
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated successfully");
    } catch (error) {
      toast.error("Error Updating contact");
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-2">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{isUpdate ? "Update Contact" : "Add New Contact"}</h2>
          <Formik
            validationSchema={ContactSchema}
            initialValues={
              isUpdate
                ? { name: contact.name, email: contact.email }
                : { name: "", email: "" }
            }
            onSubmit={(values) => {
              isUpdate ? updateContact(values, contact.id) : addContact(values);
            }}
          >
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white/80 font-medium">Name</label>
                <Field
                  name="name"
                  className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter name"
                />
                <div className="text-red-400 text-sm h-4">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white/80 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter email"
                />
                <div className="text-red-400 text-sm h-4">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white h-12 rounded-xl font-bold shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-[1.02]"
              >
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default Changes;
