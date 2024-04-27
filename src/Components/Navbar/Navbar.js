import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthCheck from '../../hooks/useAuthCheck';




const Navbar = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const { user, validateLogin } = useAuthCheck();

    const handleAddPropertyClick = () => {
        if (validateLogin()) {
            setModalOpened(true);
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("user", JSON.stringify(result.user));
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("user");
        }).catch((err) => alert(err.message));
    };



    const Links = [
        { name: "Properties",link:'/Properties' },
        { name: "Contact", link: "mailto:shaikhtausif7557@gmail.com" },
        { name: "Add Property", link: "", onClick: handleAddPropertyClick },
    ];

    const [open, setOpen] = useState(false);


    return (
        <div className='w-full fixed top-0 left-0 bg-transparent' >
            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7 bg-transparent'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-blue-600">
                        <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                        <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clipRule="evenodd" />
                        <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                    </svg>

                    <span className="w-7 h-7 text-blue-600">RealEstateHub</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {
                        open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                    }
                </div>
                {/* linke items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {Links.map((link, index) => (
                        <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                            {link.onClick ? (
                                <button onClick={link.onClick} className='text-black-800 hover:text-blue-400 duration-500'>{link.name}</button>
                            ) : (
                                <a href={link.link} className='text-black-800 hover:text-blue-400 duration-500 '>{link.name}</a>
                            )}
                        </li>
                    ))}
                    {user ? (
                        <button className='btn bg-red-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static' onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static' onClick={signInWithGoogle}>Login</button>
                    )}
                </ul>
                <AddPropertyModal
    modalOpened={modalOpened}
    setModalOpened={setModalOpened} />

                {/* button */}
            </div>
        </div>
    );
};

export default Navbar;
