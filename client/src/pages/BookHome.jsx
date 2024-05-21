import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/BooksTable";
import BooksCard from "../components/BooksCard";

const BookHome = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="text-4xl my-8 text-center font-extrabold border-b">
        Books List
      </div>

      <div className="flex justify-between items-center gap-x-4">
        <div className="">
          <button
            className="bg-sky-300 hover:bg-sky-600 ml-3  p-2 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 ml-6 p-2 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex items-center">
          <h1 className="mr-1 font-bold">Add</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5"></div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default BookHome;