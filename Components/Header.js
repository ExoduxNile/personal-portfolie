import React, { useState } from "react";
import Image from "next/image";
import logo from "../asest/logoo.png";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/outline";
import Fade from "react-reveal/Fade";

function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Fade top>
        <div className="sticky top-0 left-0 bg-black z-50">
          <div className="flex items-center justify-between  text-gray-100 p-5">
            <div className="">
              <Link href="/">
                <Image
                  src={logo}
                  alt="fgdg"
                  width={150}
                  height={50}
                  objectFit="cover"
                  className="cursor-pointer"
                />
              </Link>
            </div>

            <div className="">
              <ul
                className={` ${
                  toggle ? "mini mini_show" : "mini"
                } items-center sm:space-x-10 flex  font-bold`}
              >
                <Link href="/about">
                  <li className="hover:bg-gradient-to-r cursor-pointer from-orange-500 to-[#3CCF91] hover:text-transparent hover:bg-clip-text transition-all duration-200">
                    <a>About</a>
                  </li>
                </Link>

                <Link href="/projects">
                  <li className="hover:bg-gradient-to-r cursor-pointer from-orange-500 to-[#3CCF91] hover:text-transparent hover:bg-clip-text  transition-all duration-200">
                    <a>Projects</a>
                  </li>
                </Link>

                <Link href="/blogs" passHref>
                  <li className="hover:bg-gradient-to-r cursor-pointer from-orange-500 to-[#3CCF91] hover:text-transparent hover:bg-clip-text transition-all duration-200">
                    <a>Blogs</a>
                  </li>
                </Link>
              </ul>
              <div onClick={() => setToggle(!toggle)}>
                <MenuIcon className="h-8 block sm:hidden z-[1100]  text-white cursor-pointer" />
              </div>
            </div>
          </div>
      <div className={` ${toggle ? 'layer layer_show': 'layer'}`} onClick={() => setToggle(false)}></div>
        </div>
      </Fade>
    </>
  );
}

export default Header;