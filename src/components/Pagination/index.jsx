import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function MyPagination() {
  const navigate = useNavigate();
  const { items } = usePagination({
    count: 5, // 5 səhifə olacaq
  });

  return (
    <nav>
      <List className="flex gap-3">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "...";
          } else if (type === "page") {
            children = (
              <button
                className="cursor-pointer px-3 py-1 flex items-center gap-2 text-neutral-500"
                type="button"
                style={{
                  borderRadius: selected ? "3px" : undefined,
                  backgroundColor: selected ? "#3b82f6" : undefined,
                  color: selected ? "white" : undefined,
                  fontWeight: selected ? "bold" : undefined,
                }}
                onClick={() => {
                  navigate(`/${page}`); // səhifə nömrəsini URL-ə əlavə et
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                className="text-neutral-500 p-1 cursor-pointer"
                type="button"
                {...item}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
