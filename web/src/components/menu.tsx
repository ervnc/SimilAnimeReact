import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import imgLogo from '../assets/logo_similanime.svg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const navigate = useNavigate();

    function logout() {
      axios.post("http://localhost:1111/logout").then((response) => {
          localStorage.removeItem("tokenUsuario");
          navigate("/");
          console.log(response)
    }) 
  }

  const [valueData, setValueDate] = useState<any>('');

  let tokenUsuario = localStorage.getItem("tokenUsuario");
  useEffect(() => {
    axios.get("http://localhost:1111/user", {
        method: "GET",
        headers: {"authorization": `${tokenUsuario}`}
    }).then((response) => {
        setValueDate(response.data.user[0]);
    })
}, [])

  return (
    <Disclosure as="nav" className="bg-[#222020] shadow-menu">
      
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={imgLogo}
                    alt="Your Company"
                  />
                  <a href="#">
                    <img
                      className="hidden h-8 w-auto lg:block scale-[2.0] mt-2 cursor-pointer"
                      src={imgLogo}
                      alt="Your Company"
                    />
                  </a>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={valueData.image == "" ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : valueData.image} // auqi
                        alt=""
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/user_edit">
                            <button
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full')}
                            >
                            Your profile
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

    </Disclosure>
  )
}