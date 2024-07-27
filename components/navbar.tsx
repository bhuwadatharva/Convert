// imports
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { LuMenu } from "react-icons/lu";

export default function Navbar() {
    return (
        <nav className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-10 md:px-8 lg:px-12 xl:px-16 2xl:px-24 border-[#800080] border-b-4 bg-white">
            <Link href="/">
                <Image alt="logo" className="w-40 cursor-pointer dark:invert" src="/images/logo.png" height={100} width={170} />
            </Link>
            <div className="hidden gap-1 md:gap-2 lg:gap-4 md:flex">
                <DropdownMenu>
                    <DropdownMenuTrigger className="font-semibold text-[#800080]">Converter</DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white font-semibold">
                        <DropdownMenuLabel>Conversion</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/" passHref>
                            <DropdownMenuItem asChild>
                                <a>Image Converter</a>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/videodrop" passHref>
                            <DropdownMenuItem asChild>
                                <a>Video Converter</a>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/audiodrop" passHref>
                            <DropdownMenuItem asChild>
                                <a>Audio Converter</a>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="font-semibold text-md">
                    <Link href="/">Home</Link>
                </Button>
                <Link href="/about">
                    <Button className="font-semibold text-md">
                        About
                    </Button>
                </Link>
                <Link href="/privacy-policy">
                    <Button className="font-semibold text-md">
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
                                        <Button className="w-full font-semibold text-md">
                                            About
                                        </Button>
                                    </Link>
                                </SheetTrigger>
                                <SheetTrigger asChild>
                                    <Link href="/privacy-policy">
                                        <Button className="w-full font-semibold text-md">
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
