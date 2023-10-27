// Form Submission State
// useful for tracking the progress and outcome of form submissions.

/**
 * 4 properties:
 * - isSubmitting - true when the form is submitting (useful one)
 * - isSubmitted - becomes and stays true when a submission is happened and only becomes false if the form is reset
 * - isSubmitSuccessful - true when the submit is successfully made. if validation error is there, it will be false
 * - submitCount - how many times submit is happened
 */

import { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
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

const YouTubeFormV20 = () => {
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
  const {
    errors: formErrors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  console.log({ touchedFields, dirtyFields, isDirty });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

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

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("errors during submission: ", errors);
    // we can provide custom error messages here or send reports to the logging service
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
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", {
            disabled: true,
          })}
        />
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

      <button
        disabled={!isDirty || !isValid || isSubmitting}
        onClick={handleSubmit(onSubmit, onError)}
        type="button"
      >
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

export default YouTubeFormV20;
