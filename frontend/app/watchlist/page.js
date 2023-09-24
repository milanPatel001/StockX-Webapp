"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import WatchlistDisplay from "@/components/WatchlistDisplay";
import "react-toastify/dist/ReactToastify.css";

function WatchList() {
  const [userLoggedIn] = useAuthState(auth);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    console.log(userLoggedIn?.uid);
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/watchlist/${userLoggedIn.uid}`
      );
      const data = await res.json();

      console.log(data);
      setStocks(data);
    };

    if (userLoggedIn?.uid) getData();
  }, [userLoggedIn]);

  if (!userLoggedIn?.uid) return <div>EMPTY</div>;

  return (
    <div className="bg-gray-50 mx-auto">
      <Navbar />

      <div className="md:w-1/2 md:mx-auto py-3">
        <WatchlistDisplay stocks={stocks} />
      </div>
    </div>
  );
}

export default WatchList;

/*

 <Navbar />

      <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
        <StockCardMini />
        <StockCardMini />

        <div className="hidden md:inline-flex">
          <StockCardMini />
        </div>

        <div className="hidden lg:inline-flex">
          <StockCardMini />
        </div>

        <div className="hidden xl:inline-flex">
          <StockCardMini />
        </div>
      </div>

      <div className="relative p-4 max-w-2xl mx-auto">
        <Searchbar />
      </div>
*/
