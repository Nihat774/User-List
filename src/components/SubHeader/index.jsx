import React from "react";

function SubHeader() {
  const texts = ["#", "Full Name", "School", "Course",  "Action"];
  return (
    <>
      <section className="flex justify-around gap-3 py-5 px-3 text-slate-600 overflow-x-scroll md:overflow-hidden">
        {texts.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex ">
                <p className=" font-semibold text-lg w-[24vw] md:w-fit">{item}</p>
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </>
  );
}

export default SubHeader;
