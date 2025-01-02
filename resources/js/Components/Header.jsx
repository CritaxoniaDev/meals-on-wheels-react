import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Dropdown from '@/Components/Dropdown';
import { FaHome, FaInfoCircle, FaUtensils, FaBlog, FaCogs, FaQuestionCircle, FaTachometerAlt, FaShoppingCart, FaHistory, FaEnvelope, FaTruck, FaUsers, FaComments, FaClipboardList, FaPlusCircle, FaUsersCog, FaHandsHelping, FaDonate } from 'react-icons/fa';

const Header = ({ user }) => {
    const { url } = usePage();
    const isAuthPage = url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/forgot-password') || url.startsWith('/reset-password');

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsFixed(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const guestMenuItems = [
        { label: 'Home', href: '/', icon: <FaHome /> },
        { label: 'About us', href: '/about', icon: <FaInfoCircle /> },
        { label: 'Get Meal', href: '/get-meal', icon: <FaUtensils /> },
        { label: 'Blog', href: '/blog', icon: <FaBlog /> },
        { label: 'Services', href: '/services', icon: <FaCogs /> },
        { label: 'FAQ', href: '/faq', icon: <FaQuestionCircle /> },
    ];

    const memberMenuItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: <FaTachometerAlt /> },
        { label: 'Orders', href: route('orders.index'), icon: <FaShoppingCart /> },
        { label: 'Delivery History', href: '/delivery-history', icon: <FaHistory /> },
        { label: 'About us', href: '/about', icon: <FaInfoCircle /> },
        { label: 'Contact', href: '/contact', icon: <FaEnvelope /> },
    ];

    const volunteerMenuItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: <FaTachometerAlt /> },
        { label: 'Deliveries', href: '/deliveries', icon: <FaTruck /> },
        { label: 'Menu', href: '/menu', icon: <FaUtensils /> },
        { label: 'About us', href: '/about', icon: <FaInfoCircle /> },
        { label: 'Contact', href: '/contact', icon: <FaEnvelope /> },
    ];

    const partnerMenuItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: <FaTachometerAlt /> },
        { label: 'Create Menu', href: route('partner.create-menu'), icon: <FaPlusCircle /> },
        { label: 'Orders', href: '/orders', icon: <FaShoppingCart /> },
        { label: 'About us', href: '/about', icon: <FaInfoCircle /> },
        { label: 'Contact', href: '/contact', icon: <FaEnvelope /> },
    ];

    const adminMenuItems = [
        { label: 'Dashboard', href: route('dashboard'), icon: <FaTachometerAlt /> },
        {
            label: 'Manage Users',
            icon: <FaUsersCog />,
            submenu: [
                { label: 'Member and Care Giver', href: '/manage-members', icon: <FaUsers /> },
                { label: 'Partners', href: '/manage-partners', icon: <FaHandsHelping /> },
                { label: 'Volunteers', href: '/manage-volunteers', icon: <FaUsers /> },
                { label: 'Donors', href: '/manage-donors', icon: <FaDonate /> },
            ]
        },
        { label: 'Feedbacks', href: '/feedbacks', icon: <FaComments /> },
        { label: 'Manage Menus', href: '/manage-menus', icon: <FaUtensils /> },
        { label: 'Manage Deliveries', href: '/manage-deliveries', icon: <FaTruck /> },
        { label: 'About us', href: '/about', icon: <FaInfoCircle /> },
        { label: 'Contact', href: '/contact', icon: <FaEnvelope /> },
    ];

    const getMenuItems = (user) => {
        if (!user) return guestMenuItems;
        switch (user.role) {
            case 'member': return memberMenuItems;
            case 'volunteer': return volunteerMenuItems;
            case 'partner': return partnerMenuItems;
            case 'admin': return adminMenuItems;
            default: return guestMenuItems;
        }
    };

    const menuItems = getMenuItems(user);

    return (
        <>
            {!isAuthPage && !user && (
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-3">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                            <span className="text-sm font-semibold tracking-wide">Join us in Making a Difference</span>
                            <div className="flex space-x-2">
                                <Button variant="secondary" size="sm" className="bg-white text-indigo-600 hover:bg-indigo-100">
                                    Donate now
                                </Button>
                                <Separator orientation="vertical" className="h-6 bg-indigo-400" />
                                <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-700">
                                    Volunteer
                                </Button>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-indigo-700">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isFixed && <div style={{ height: '64px' }}></div>}
            {!isAuthPage && (
                <header className={`
                bg-white shadow-md
                transition-all duration-300 ease-in-out
                ${isFixed ? 'fixed top-0 left-0 right-0 z-50 transform -translate-y-full animate-slideDown' : 'relative'}
            `}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="flex items-center space-x-2">
                                    <img className="h-10 w-auto rounded-md shadow-sm" src="/images/logo.png" alt="Logo" />
                                </Link>
                            </div>
                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList>
                                    {menuItems.map((item, index) => (
                                        <NavigationMenuItem key={index}>
                                            {item.submenu ? (
                                                <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium hover:bg-indigo-50 rounded-md transition-colors flex items-center">
                                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                                    {item.label}
                                                </NavigationMenuTrigger>
                                            ) : (
                                                <NavigationMenuLink href={item.href} className="px-3 py-2 text-sm font-medium hover:bg-indigo-50 rounded-md transition-colors flex items-center">
                                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                                    {item.label}
                                                </NavigationMenuLink>
                                            )}
                                            {item.submenu && (
                                                <NavigationMenuContent>
                                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white shadow-lg rounded-md">
                                                        {item.submenu.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <NavigationMenuLink href={subItem.href} className="block p-2 hover:bg-indigo-50 rounded-md transition-colors flex items-center">
                                                                    {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                                                                    {subItem.label}
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex items-center space-x-2 rounded-md bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatar_url} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                                <span className="text-xs font-semibold uppercase bg-indigo-200 px-2 py-1 rounded-full">{user.role}</span>
                                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content className="w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                            <Dropdown.Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <>
                                        <Button variant="outline" asChild className="border-indigo-500 text-indigo-600 hover:bg-indigo-50">
                                            <Link href={route('login')}>Login</Link>
                                        </Button>
                                        <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700">
                                            <Link href={route('register')}>Sign up</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;