import { useRouter } from "next/router";
import { useRef } from "react";
import {
  Form,
  Input,
  Button,
  TextArea,
  Label,
  Container,
  Radio
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

const INPUT_STYLES = { width: "100%", margin: "1rem auto" };

export function TaskForm({
  handleSubmit,
  inputNames = {},
  inputValues = { priority: "low" },
  submitButtonText = "Submit",
  redirectTo = ""
}) {
  const {
    current: { lowId, highId, mediumId }
  } = useRef({
    lowId: uuid(),
    mediumId: uuid(),
    highId: uuid()
  });

  const { push } = useRouter();
  return (
    <div className="bg-gray-100 text-black p-10 rounded w-[50%] m-auto">
      <form
        onSubmit={async e => {
          await handleSubmit(e);
          redirectTo && push(redirectTo);
        }}
        className="w-[80%] m-auto text-2xl flex flex-col"
      >
        <label className="text-left">Title :</label>

        <input
          style={INPUT_STYLES}
          minLength={6}
          type="text"
          name={inputNames.title}
          id={inputNames.title}
          required={true}
          defaultValue={inputValues.title}
          placeholder="Enter Your Task Title"
          className="border-2 border-black border-solid p-2 rounded"
        />
        <label className="text-left">Description (optional):</label>
        <textarea
          style={INPUT_STYLES}
          rows={4}
          type="text"
          name={inputNames.description}
          id={inputNames.description}
          defaultValue={inputValues.description}
          placeholder="Enter Your Task Details"
          className="border-2 border-black border-solid p-2 rounded"
        />
        <h4 className="text-left">Task priority:</h4>
        <div className="flex items-center gap-4">
          <label htmlFor={lowId}>LOW</label>
          <Radio
            name={inputNames.priority}
            id={lowId}
            defaultChecked={
              inputValues.priority === "low" || !inputValues.priority
            }
            value="low"
          />


          <label htmlFor={mediumId}>MEDIUM</label>
          <Radio
            name={inputNames.priority}
            id={mediumId}
            defaultChecked={inputValues.priority === "medium"}
            value="medium"
          />



          <label htmlFor={highId}>HIGH</label>
          <Radio
            name={inputNames.priority}
            id={highId}
            defaultChecked={inputValues.priority === "high"}
            value="high"
          />


        </div>
        <br></br>
        <Button color={"green"} type="submit">
          {submitButtonText}
        </Button>
      </form>
    </div>
  );
}
