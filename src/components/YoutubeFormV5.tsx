// validating form data upon submittion using react form hook
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeFormV5 = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, control } = form;

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
  };

  // If you are wrapping the inputs inside the form tag, make sure to add noValidate prop to let browser know that it need not to validate the form data
  // eg:
  // <form onSubmit={handleSubmit(onSubmit)} noValidate></form>

  return (
    <div>
      <h1>YouTube Form</h1>

      <label className="username">Username</label>
      <input
        type="text"
        id="username"
        {...register("username", {
          required: "Username is required",
        })}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email format",
          },
        })}
      />

      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        {...register("channel", {
          required: {
            value: true,
            message: "Channel is required",
          },
        })}
      />

      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV5;
