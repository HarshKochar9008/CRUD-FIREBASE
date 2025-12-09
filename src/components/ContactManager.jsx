import Navbar from "./Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import ContactCard from "./ContactCard";
import Changes from "./Changes";
import useDisclose from "../hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoContact from "./NoContact";
import BackgroundBeamsWithCollision from "./BackgroundBeamsWithCollision";
import { motion, AnimatePresence } from "framer-motion";

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclose();

    useEffect(() => {
        const getContacts = async () => {
            try {
                const contactsRef = collection(db, "contacts");
                onSnapshot(contactsRef, (snapshot) => {
                    const contactsList = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    setContacts(contactsList);
                    setFilteredContacts(contactsList);
                });
            } catch (error) {
                console.error(error);
            }
        };

        getContacts();
    }, []);

    useEffect(() => {
        let result = [...contacts];

        // Filter
        if (searchTerm) {
            result = result.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        result.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return sortAsc ? -1 : 1;
            if (nameA > nameB) return sortAsc ? 1 : -1;
            return 0;
        });

        // Favorites to top (optional, but good UX)
        result.sort((a, b) => {
            return (b.isFavorite === true) - (a.isFavorite === true);
        });

        setFilteredContacts(result);
    }, [contacts, searchTerm, sortAsc]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSort = () => {
        setSortAsc(!sortAsc);
    };

    return (
        <>
            {/* Fullscreen background */}
            <div className="relative h-screen w-full overflow-hidden flex justify-center items-center bg-gray-900 text-white">
                {/* BackgroundBeamsWithCollision will be full screen */}
                <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

                {/* Foreground content */}
                <div className="relative z-10 mx-auto h-full max-h-[90vh] w-full max-w-3xl rounded-2xl glass p-6 shadow-2xl overflow-hidden flex flex-col">
                    <Navbar />
                    <div className="flex gap-4 mt-6 items-center">
                        <div className="relative flex flex-grow items-center">
                            <FiSearch className="absolute ml-3 text-white/70 text-2xl" />
                            <input
                                onChange={handleSearch}
                                value={searchTerm}
                                type="text"
                                placeholder="Search contacts..."
                                className="flex-grow h-12 rounded-xl border border-white/30 bg-white/10 text-white pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/50 transition-all"
                            />
                        </div>
                        <button
                            onClick={toggleSort}
                            className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all cursor-pointer"
                            title="Sort by Name"
                        >
                            {sortAsc ? <FaSortAlphaDown className="text-xl" /> : <FaSortAlphaUp className="text-xl" />}
                        </button>
                        <button
                            onClick={onOpen}
                            className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-purple-600 hover:bg-purple-100 transition-all shadow-lg cursor-pointer"
                        >
                            <AiFillPlusCircle className="text-3xl" />
                        </button>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                        {filteredContacts.length <= 0 ? (
                            <NoContact />
                        ) : (
                            <AnimatePresence>
                                {filteredContacts.map((contact) => (
                                    <motion.div
                                        key={contact.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ContactCard contact={contact} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>

            {/* Changes modal and Toast */}
            <Changes isOpen={isOpen} onClose={onClose} />
            <ToastContainer position="bottom-center" theme="dark" />
        </>
    );
};

export default ContactManager;
