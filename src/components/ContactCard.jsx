import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { FaStar, FaRegStar } from "react-icons/fa";
import { db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Changes from "./Changes";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Contact");
    }
  }

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent triggering other clicks if any
    try {
      const contactRef = doc(db, "contacts", contact.id);
      await updateDoc(contactRef, {
        isFavorite: !contact.isFavorite
      });
      // Toast is optional here, maybe too noisy
    } catch (error) {
      console.error(error);
      toast.error("Error updating favorite");
    }
  }

  return (
    <>
      <div key={contact.id} className="glass-card flex items-center justify-between p-3 rounded-xl mb-2 group">
        <div className="flex gap-4 items-center">
          <div onClick={toggleFavorite} className="cursor-pointer text-yellow-400 text-2xl hover:scale-110 transition-transform">
            {contact.isFavorite ? <FaStar /> : <FaRegStar className="text-white/50 group-hover:text-yellow-400" />}
          </div>
          <HiOutlineUserCircle className="text-purple-400 text-5xl" />
          <div className="text-white">
            <h2 className="font-semibold text-lg">{contact.name}</h2>
            <h1 className="text-sm text-white/70">{contact.email}</h1>
          </div>
        </div>
        <div className="flex text-3xl gap-2">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer text-white/80 hover:text-blue-400 transition-colors" />
          <IoMdTrash onClick={() => deleteContact(contact.id)} className="cursor-pointer text-white/80 hover:text-red-500 transition-colors" />
        </div>
      </div>
      <Changes contact={contact} isUpdate={true} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
