import React, { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const [isOpen, setIsOpen] = useState();
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    school: "",
    course: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
      id: data?.length + 1,
    });
  }

  function handleClick() {
    setIsOpen(!isOpen);
  }
  async function handleSubmit(e) {
    const url = "http://localhost:3000/users";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newUser),
      });
      setNewUser({
        name: "",
        surname: "",
        school: "",
        course: "",
      });
      if (!response.ok) {
        console.log("xeta bas verdi");
      }

      const data = await response.json();
      alert(`Məlumat əlavə olundu ${data.name}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <header className="bg-blue-500 flex justify-between items-center  py-3 px-2 md:px-5">
          <div className="flex gap-2 text-sm md:text-2xl text-white p-3">
            <p>USER</p>
            <p className="font-semibold">MANAGEMENT</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-sm p-2 md:p-3 bg-white cursor-pointer">
              <FaFile className="text-slate-600 text-sm md:text-xl" />
              <p className="text-slate-600 text-[12px] md:text-lg">
                Export to Excel
              </p>
            </button>
            <button
              className="flex items-center gap-2 rounded-sm p-2 md:p-3 bg-white cursor-pointer"
              onClick={handleClick}
            >
              <FaCirclePlus className="text-slate-600 text-sm md:text-xl cursor-pointer" />
              <p className="text-slate-600 text-[12px] md:text-lg">
                Add New User
              </p>
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } p-5 absolute  md:top-[10%] md:right-[30%] top-[8%] right-[7%] w-[85vw] md:w-[50vw] h-[90vh] md:h-[80vh] bg-gray-200 rounded-lg`}
          >
            <div className="">
              <div className="flex justify-end">
                <CiSquareRemove
                  className="text-5xl md:text-3xl cursor-pointer"
                  onClick={handleClick}
                />
              </div>
              <legend className="text-2xl font-semibold px-5">
                Add New User
              </legend>
              <form
                className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between p-3 md:p-9"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="flex justify-center">
                  <div className="size-[90px] md:size-[170px] flex  items-center justify-center bg-white rounded-full border border-neutral-500">
                    <input
                      type="file"
                      onChange={handleChange}
                      name="icon"
                      value={newUser.icon}
                      id="file"
                      className="hidden"
                    />

                    <label htmlFor="file" className="cursor-pointer">
                      <img
                        className="size-[30px] md:size-[80px]  object-cover"
                        src={newUser.icon || "/add image.png"}
                        alt="user"
                      />
                    </label>
                  </div>
                </div>

                <div className="w-[68vw] md:w-[23vw] flex flex-col gap-5 p-0 md:p-5">
                  <input
                    required
                    value={newUser.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="p-3  rounded-lg bg-white"
                    placeholder="User Name"
                  />
                  <input
                    required
                    value={newUser.surname}
                    name="surname"
                    onChange={handleChange}
                    type="text"
                    className="p-3  rounded-lg bg-white"
                    placeholder="Surname"
                  />
                  <input
                    required
                    value={newUser.school}
                    name="school"
                    onChange={handleChange}
                    type="text"
                    className="p-3  rounded-lg bg-white"
                    placeholder="School"
                  />
                  <input
                    required
                    value={newUser.course}
                    name="course"
                    onChange={handleChange}
                    type="text"
                    className="p-3  rounded-lg bg-white"
                    placeholder="Course"
                  />
                  <div className="flex justify-center">
                    <button
                      className={`bg-blue-500 py-2 w-[25vw] md:w-[10vw]  rounded-lg text-white cursor-pointer`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}

export default Header;
