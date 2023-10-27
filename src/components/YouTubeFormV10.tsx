// handling dynamic fields - like adding object to an array of objects, etc...
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  // for demonstration:
  phNumbers: {
    // useFieldArray will only work with array of objects.
    number: string;
  }[];
};

const YouTubeFormV10 = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors: formErrors } = formState;

  // we need to specify the phNumbers field as array of fields
  const {
    fields: phNumbers,
    append: addPhNumber,
    remove: removePhNumber,
  } = useFieldArray({
    name: "phNumbers",
    control,
  }); // pass the field name, control from the form and get the destructured fields it return that can be used in jsx.

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

      <div className="form-control">
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register("social.twitter")} />
      </div>

      <div className="form-control">
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />
      </div>

      <div className="form-control">
        <label htmlFor="primary-phone">Primary phone number</label>
        <input type="text" id="primary-phone" {...register("phoneNumbers.0")} />
      </div>

      <div className="form-control">
        <label htmlFor="secondary-phone">Secondary phone number</label>
        <input
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1")}
        />
      </div>

      <div>
        <label>List of phone numbers</label>
        <div>
          {phNumbers.map((phNumber, index) => {
            // pass the id property as key which is provided by react-hook-form (recommended)
            return (
              <div className="form-control" key={phNumber.id}>
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => removePhNumber(index)}>
                    Remove phone number
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => addPhNumber({ number: "" })}>
            Add phone number
          </button>
        </div>
      </div>

      <button onClick={handleSubmit(onSubmit)}>Submit</button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV10;
