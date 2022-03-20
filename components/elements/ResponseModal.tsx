/**
 * Error and Success Modal Component
 *
 */

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { CheckCircle, Info, Warning, XCircle } from "phosphor-react";
import { Fragment, useEffect, useReducer, useState } from "react";
import ModalModel from "../../models/ModalModel";

const ResponseModal: React.FC<{
  modalState: ModalModel;
  isModalOpen: boolean;
  toggleModal?: (
    type: "success" | "error" | "warning" | "info" | "none",
    isVisible: boolean
  ) => void;
}> = (props) => {
  /* Use a useReducer Hook instead of useState hook to control large collection of field states, here both modal open and close states are handled */
  const modalReducerInitialState = new ModalModel();

  function reducer(
    state: any,
    action: { isOpen: boolean; modalDetails: ModalModel }
  ) {
    switch (action.isOpen) {
      case true:
        return {
          ...state,
          isOpen: true,
          title: action.modalDetails.title,
          message: action.modalDetails.message,
          linkMain: action.modalDetails.linkMain,
          linkSub: action.modalDetails.linkSub,
          type: action.modalDetails.type,
        };
      default:
        return { ...state, isOpen: true, type: "info" };
    }
  }

  const [modalState, modalDispatch] = useReducer(
    reducer,
    modalReducerInitialState
  );

  /*-------------------------------------*/

  /* Modal Toggling Functions */

  let [isOpen, setIsOpen] = useState(true);

  function toggleModal(visibility: boolean = !isOpen) {
    props.toggleModal && props.toggleModal(props.modalState.type, visibility);
    setIsOpen(visibility);
  }

  function closeModal() {
    toggleModal(false);
  }

  function openModal() {
    toggleModal(true);
  }

  /*-------------------------------------*/

  /* trigger model open whenever parent component requests to open the modal */
  useEffect(() => {
    setIsOpen(props.isModalOpen);

    modalDispatch({
      isOpen: props.isModalOpen,
      modalDetails: props.modalState,
    });
  }, [props.isModalOpen]);

  /*-------------------------------------*/

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-flex flex-col w-full text-center max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="h-full flex flex-col pt-14 pb-12 min-h-[20rem]">
                  {props.modalState.type == "success" && (
                    <CheckCircle
                      className="mx-auto"
                      color={"#23B520"}
                      size={64}
                      weight="fill"
                    />
                  )}
                  {props.modalState.type == "error" && (
                    <XCircle
                      className="mx-auto"
                      color={"#D21919"}
                      size={64}
                      weight="fill"
                    />
                  )}
                  {props.modalState.type == "warning" && (
                    <Warning
                      className="mx-auto"
                      color={"#ffcc00"}
                      size={64}
                      weight="fill"
                    />
                  )}
                  {props.modalState.type == "info" && (
                    <Info
                      className="mx-auto"
                      color={"#5bc0de"}
                      size={64}
                      weight="fill"
                    />
                  )}

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-4xl mb-4 mt-11 leading-6 text-black"
                  >
                    {modalState.title}
                  </Dialog.Title>
                  <div className="">
                    <p className="text-site-gray-800 font-normal text-2xl mb-6">
                      {modalState.message}
                    </p>
                    <button onClick={closeModal}>
                      <p className="text-site-blue-500 font-medium text-lg mb-4">
                        {modalState.linkMain.title}
                      </p>
                    </button>
                    <Link href={modalState.linkSub.url}>
                      <a>
                        <p className="text-lg font-medium text-site-gray-400">
                          {modalState.linkSub.title}
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ResponseModal;
