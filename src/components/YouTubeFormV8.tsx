// adding default values for the form
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeFormV8 = () => {
  // ------ variation 1 --------
  // const form = useForm<FormValues>({
  //   defaultValues: {
  //     username: "Batman",
  //     email: "",
  //     channel: "",
  //   },
  // });

  // ------ variation 2 -------- initializing default values with previously saved data
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman",
        email: data.email,
        channel: "",
      };
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors: formErrors } = formState;

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <div className="form-control">
        <label className="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <p className="error">{formErrors.username?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className="error">{formErrors.email?.message}</p>
      </div>

      <div className="form-control">
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
        <p className="error">{formErrors.channel?.message}</p>
      </div>

      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV8;
