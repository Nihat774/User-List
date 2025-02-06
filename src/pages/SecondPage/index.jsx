import React, { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

function Data() {
  const [data, setData] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState(false);
  const [newEditedUser, setNewEditedUser] = useState({
    name: "",
    course: "",
    school: "",
  })
  const [clickedUserData, setClickedUserData] = useState({
    id: "",
    name: "",
    school: "",
    course: "",
  });
  //
  const url = "http://localhost:3000/users";
  // datanı dəyişmık üçün post metodu
  async function handleUpdate(e) {
    // e.preventDefault();

    const response = await fetch(`${url}/${clickedUserData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEditedUser.name,
        course: newEditedUser.course,
        school: newEditedUser.school,
      }),
    });

    if (response.ok) {
      alert("İstifadəçi adı uğurla dəyişdirildi!");
    } else {
      alert("Xəta baş verdi!");
    }
    setNewEditedUser("");
    setClickedUser(!clickedUser);
  }
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function handleEdit() {
    setClickedUser(true);
  }
  useEffect(() => {
    if (clickedUser) {
      handleEdit();
    }
  }, [clickedUser]);

  function handleRemove(name) {
    setDeletedUsers((prev) => [...prev, name]);
  }

  return (
    <section className="flex flex-col gap-3 min-h-[65vh]">
      {data
        ?.filter(({ name }) => !deletedUsers.includes(name)).slice(5,10)
        .map(({ id, name, school, course ,surname}) => {
          return (
            <React.Fragment key={id}>
              <hr className="text-slate-400 mx-7" />
              <div className="flex justify-around gap-3 p-3 overflow-x-auto md:overflow-hidden">
                <p className="  text-center text-xl ">{id}</p>
                <div className="flex  items-center gap-2">
                  <img
                    className="size-[30px]"
                    src={"/user.webp"}
                    alt="user image"
                  />
                  <p className="text-slate-600 font-semibold md:w-[13vw] w-[45vw]">{name} {surname}</p>
                </div>

                <p className="w-[140px] text-slate-600 text-center">{school}</p>
                <div className="flex gap-3 items-center">
                  <p className="w-[150px] md:w-[140px] text-slate-600 text-center">
                    {course}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-[100px]">
                  <IoMdSettings
                    className="text-blue-500 text-2xl cursor-pointer"
                    onClick={() => {
                      setClickedUserData({
                        id,
                        name,
                        school,
                        course,
                      });
                      handleEdit(name);
                    }}
                  />
                  <TiDelete
                    className="text-red-500 text-3xl cursor-pointer"
                    onClick={() => handleRemove(name)}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}

      {/* Edit modalı */}
      <div
        className={`${
          clickedUser ? "block" : "hidden"
        } bg-neutral-300 rounded-lg w-[70vw] md:w-[40vw] h-fit p-5 absolute top-[12%] right-[15%] md:right-[32%]`}
      >
        {/* close icon */}
        <div className="flex justify-end">
          <CiSquareRemove
            className={`text-3xl cursor-pointer`}
            onClick={() => setClickedUser(!clickedUser)}
          />
        </div>

        {
          <form
            className="flex items-center flex-col gap-5"
            onSubmit={(e) => handleUpdate(e)}
          >
            <legend className="text-lg md:text-xl font-semibold py-3">
              Change  user's informations
            </legend>

            <input
              type="text"
              required
              className="p-3 rounded-lg bg-white w-[55vw] md:w-[30vw]"
              value={newEditedUser.name}
              placeholder="New Name"
              onChange={(e) =>
                setNewEditedUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              type="text"
              required
              value={newEditedUser.school}
              className="p-3 rounded-lg bg-white w-[55vw] md:w-[30vw]"
              placeholder="New School"
              onChange={(e) =>
                setNewEditedUser((prev) => ({
                  ...prev,
                  school: e.target.value,
                }))
              }
            />
            <input
              value={newEditedUser.course}
              required
              type="text"
              className="p-3 rounded-lg bg-white w-[55vw] md:w-[30vw]"
              placeholder="New Course"
              onChange={(e) =>
                setNewEditedUser((prev) => ({
                  ...prev,
                  course: e.target.value,
                }))
              }
            />
            <div className="flex justify-center">
              <button className="p-2 w-[25vw] md:w-[15vw] bg-blue-500 text-white rounded-lg cursor-pointer">
                Change
              </button>
            </div>
          </form>
        }
      </div>

      <hr className="text-slate-400 mx-7" />
    </section>
  );
}

export default Data;
