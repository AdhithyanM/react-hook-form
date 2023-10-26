// using react hook form
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

// react-hook-form don't re-render the component each time the input changes
let renderCount = 0;

const YouTubeFormV3 = () => {
  const form = useForm();
  const { register, control } = form;

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      {/* react strict mode renders the components twice in development. hence divided by 2 */}

      <label className="username">Username</label>
      <input type="text" id="username" {...register("username")} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="channel">Channel</label>
      <input type="text" id="channel" {...register("channel")} />

      <button onClick={() => "somthign"}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV3;
