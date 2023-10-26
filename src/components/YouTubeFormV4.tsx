// handling form submit
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeFormV4 = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, control } = form;

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <label className="username">Username</label>
      <input type="text" id="username" {...register("username")} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="channel">Channel</label>
      <input type="text" id="channel" {...register("channel")} />

      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV4;
