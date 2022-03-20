/**
 * Dropdown Menu. Used as action drop down for table values
 *
 */

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { DotsThree, PencilLine, Trash } from 'phosphor-react'

const Dropdown:React.FC<{documentId:string , rowId:number, onDelete: (e: any) => void; onEditClicked: (e: any) => void; }> = (props) => {
  
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2">
            
            <DotsThree color='#454545' size={30} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-40 right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={props.onEditClicked.bind(this, {documentId:props.documentId, rowId:props.rowId})} 
                    className='hover:bg-gray-100 group text-black flex rounded-md items-center w-full px-4 py-2 text-lg'
                  >
                    <PencilLine className='mr-4' color='#000000' size={26} />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={props.onDelete.bind(this, {documentId:props.documentId, rowId:props.rowId})}
                    className='hover:bg-gray-100 group text-danger flex rounded-md items-center w-full px-4 py-2 text-lg'
                  >
                    <Trash className='mr-4' color='#D21919' size={26} />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
export default Dropdown;