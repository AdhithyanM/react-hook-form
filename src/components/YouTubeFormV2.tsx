// using react hook form
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

const YouTubeFormV2 = () => {
  const form = useForm();
  const { register, control } = form;

  return (
    <div>
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

export default YouTubeFormV2;
