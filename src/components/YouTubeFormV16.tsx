// Touched and Dirty properties
// Touched - whether the user is interacted with the field or not (sets true when click in and out happened)
// Dirty - if the value is changed it becomes true and if the value is same it will be false.
// they are available at the form level too.
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // to show the form state in devtools

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YouTubeFormV16 = () => {
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
      age: 0,
      dob: new Date(),
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors: formErrors, touchedFields, dirtyFields, isDirty } = formState;

  console.log("touchedFields: ", touchedFields);
  console.log("dirtyFields: ", dirtyFields); // provides the same form structure with values of key being true or false representing if its changed
  console.log("is the form dirty: ", isDirty); // to check if the form itself is changed

  const {
    fields: phNumbers,
    append: addPhNumber,
    remove: removePhNumber,
  } = useFieldArray({
    name: "phNumbers",
    control,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleGetValues = () => {
    console.log("getValues: ", getValues());

    console.log("twitter: ", getValues("social.twitter"));
    console.log(
      "[twitter, facebook]: ",
      getValues(["social.twitter", "social.facebook"])
    );
  };

  const handleSetValue = () => {
    setValue("username", "");
    setValue("channel", "EA", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
  };

  renderCount++;

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}

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

      <div className="form-control">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age is required",
            },
          })}
        />
        <p className="error">{formErrors.age?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "Date of Birth is required",
            },
          })}
        />
        <p className="error">{formErrors.dob?.message}</p>
      </div>

      <button onClick={handleSubmit(onSubmit)} type="button">
        Submit
      </button>
      <button onClick={handleGetValues} type="button">
        Get Values
      </button>
      <button onClick={handleSetValue} type="button">
        Set Value
      </button>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeFormV16;
