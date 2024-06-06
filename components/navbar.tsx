// imports
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

import { LuMenu } from "react-icons/lu";

export default function Navbar({ }): any {
    return (
        <nav className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-10 md:px-8 lg:px-12 xl:px-16 2xl:px-24 border-b-4 border-slate-200">
            <Link href="/">
                <Image alt="logo" className="w-40 cursor-pointer dark:invert" src="/images/logo.png" height={100} width={170} />
            </Link>
            <div className="hidden gap-1 md:gap-2 lg:gap-4 md:flex">
                <Button  className="font-semibold text-md">
                    <Link href="/">Home</Link>
                </Button>
                <Link href="/about">
                    <Button className="font-semibold text-md">
                        About
                    </Button>
                </Link>
                <Link href="/privacy-policy">
                    <Button  className="font-semibold text-md">
                        Privacy Policy
                    </Button>
                </Link>
            </div>
            {/* MOBILE NAV */}
            <Sheet>
                <SheetTrigger className="block p-3 md:hidden">
                    <span className="text-2xl text-slate-950 dark:text-slate-200">
                        <LuMenu />
                    </span>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <div className="flex flex-col w-full h-full">
                                <SheetTrigger asChild>
                                    <Link href="/">
                                        <Button className="w-full font-semibold text-md">
                                            Home
                                        </Button>
                                    </Link>
                                </SheetTrigger>
                                <SheetTrigger asChild>
                                    <Link href="/about">
                                        <Button  className="w-full font-semibold text-md">
                                            About
                                        </Button>
                                    </Link>
                                </SheetTrigger>
                                <SheetTrigger asChild>
                                    <Link href="/privacy-policy">
                                        <Button  className="w-full font-semibold text-md">
                                            Privacy Policy
                                        </Button>
                                    </Link>
                                </SheetTrigger>
                               
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
