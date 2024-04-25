import { AiFillEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import Link from "next/link";
import { Card } from "semantic-ui-react";

const priorityColors = {
  low: "red ",
  medium: "orange",
  high: "green"
};
const priorityColorsText = {
  low: "white",
  medium: "black",
  high: "white"
};
export function TaskCard({
  title,
  description,
  priority = "low",
  _id,
  handleDelete
}) {
  return (
    <>
      <div

        className="bg-white text-black w-[30%] rounded relative p-4 text-start"
      >
        <span
          style={{
            backgroundColor: priorityColors[priority],
            color: priorityColorsText[priority],


          }}
          className="rounded p-2  text-left top-5 right-5 uppercase "
        >
          {priority}
        </span>
        <Card.Header>

          <h2

            className="text-2xl font-bold mt-3 uppercase text-start"
          >
            <br></br>
            {title}
          </h2>
        </Card.Header>

        <Card.Description>
          <br></br>
          <p style={{ fontSize: "1.4rem" }} className="text-start">{description}</p>
        </Card.Description>
        <br />
        <div className="flex items-center gap-3" >
          <button color={"youtube"} onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1">
            <AiTwotoneDelete />
            <span>DELETE</span>
          </button>
          <Link href={`/${_id}`}>
            <button color={"twitter"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1">
              <AiFillEdit />
              <span>EDIT</span> </button>
          </Link>
        </div>
      </div>
    </>
  );
}
