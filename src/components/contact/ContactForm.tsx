import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { buttonClass, inputClass } from "../../styles/classNames";
import { fieldErrorProps } from "../../utils/form";
import EmptyState from "../shared/EmptyState";
import FormField from "./FormField";

const SUBJECTS = ["Question about a book", "Order or cart help", "Book suggestion", "Other"];

const NAME_MIN = 2;
const NAME_MAX = 60;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;

// How long the fake "sending" takes, to mimic a network request.
const SIMULATED_SEND_DELAY_MS = 800;

// The validation rules for the form. React Hook Form runs this schema
// through zodResolver and shows each message under its field.
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN, `Please enter your name (at least ${NAME_MIN} characters)`)
    .max(NAME_MAX, `Name must be ${NAME_MAX} characters or fewer`),
  email: z.email("Please enter a valid email address"),
  subject: z.string().refine((value) => SUBJECTS.includes(value), {
    message: "Please choose a subject",
  }),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, `Your message must be at least ${MESSAGE_MIN} characters`)
    .max(MESSAGE_MAX, `Your message must be ${MESSAGE_MAX} characters or fewer`),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const EMPTY_FORM: ContactFormValues = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  // The name of the person who just sent a message; null while the form is shown.
  const [sentBy, setSentBy] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_FORM,
  });

  // Re-renders as the user types, to keep the character counter up to date.
  const messageLength = useWatch({ control, name: "message" }).length;

  // Sending is simulated: there is no backend, so we wait briefly
  // and then show a confirmation.
  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SEND_DELAY_MS));
    setSentBy(values.name);
    reset();
  };

  if (sentBy) {
    return (
      <div role="status" className="py-10">
        <EmptyState
          icon="📬"
          title={`Thanks, ${sentBy}!`}
          action={
            <button type="button" onClick={() => setSentBy(null)} className={buttonClass()}>
              Send another message
            </button>
          }
        >
          Your message has been sent. This is a demo store, so no email was actually delivered.
        </EmptyState>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <h2 className="font-serif text-2xl font-bold">Send a message</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass({ hasError: !!errors.name })}
            {...fieldErrorProps("name", errors.name?.message)}
            {...register("name")}
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass({ hasError: !!errors.email })}
            {...fieldErrorProps("email", errors.email?.message)}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField id="subject" label="Subject" error={errors.subject?.message}>
        <select
          id="subject"
          className={`${inputClass({ hasError: !!errors.subject })} cursor-pointer`}
          {...fieldErrorProps("subject", errors.subject?.message)}
          {...register("subject")}
        >
          <option value="">Choose a subject…</option>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="message"
        label="Message"
        error={errors.message?.message}
        labelExtra={
          <span
            className={`text-xs ${messageLength > MESSAGE_MAX ? "text-red-600" : "text-stone-500"}`}
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        }
      >
        <textarea
          id="message"
          rows={6}
          className={`${inputClass({ hasError: !!errors.message })} resize-y`}
          {...fieldErrorProps("message", errors.message?.message)}
          {...register("message")}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${buttonClass()} w-full sm:w-auto`}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default ContactForm;
