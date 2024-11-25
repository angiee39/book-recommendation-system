import React, {useState} from 'react';
import { useUser } from '@/context/user-context';
import Link from "next/link";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href='/books'>
                            <h1 className="text-white font-bold text-2xl">Book Recommendation System</h1>
                        </Link>
                    </div>
                    {user && (
                        <>
                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/books"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                    >
                                        Books
                                    </Link>
                                    <Link
                                        href="/reviews"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                    >
                                        Reviews
                                    </Link>
                                    <Link
                                        href="/account"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                                    >
                                        {user ? "Account" : "Login"}
                                    </Link>
                                </div>
                            </div>
                            {/* Mobile menu button */}
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    onClick={toggleMenu}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {/* Icon for mobile */}
                                    {isOpen ? (
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path

                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16m-7 6h7"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* Mobile Menu */}
            {user && isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/books"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Books
                        </Link>
                        <Link
                            href="/reviews"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/account"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            {user ? "Account" : "Login"}
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;