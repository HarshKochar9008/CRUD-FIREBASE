import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center z-50 backdrop-blur-md bg-black/40">
          <div className="relative rounded-2xl z-50 w-full max-w-md max-h-[80vh] bg-gray-900/90 border border-white/20 p-6 overflow-y-auto shadow-2xl">
            <div className="flex justify-end items-center mb-2">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer text-white/70 hover:text-white transition-colors"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
    , document.getElementById("modal-root")
  );
};

export default Modal;
