// adding default values for the form
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  usename: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email format is not valid"),
  channel: z.string().min(1, "Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const ZodYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors: formErrors } = formState;

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
  };

  return (
    <div>
      <h1>Zod YouTube Form</h1>

      <div className="form-control">
        <label className="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        <p className="error">{formErrors.username?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        <p className="error">{formErrors.email?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <p className="error">{formErrors.channel?.message}</p>
      </div>

      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default ZodYouTubeForm;
