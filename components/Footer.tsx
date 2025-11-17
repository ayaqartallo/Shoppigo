"use client"
import { usePathname } from "next/navigation";

export default function Footer(){
     const pathname = usePathname();
      if (pathname.startsWith("/auth")) return null;
    return(
        <div className="flex justify-center items-center  bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-6 mt-6 text-white">
            &copy; 2025, All rights reserved
        </div>
    )
}