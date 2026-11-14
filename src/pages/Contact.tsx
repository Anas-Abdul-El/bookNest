import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const subjects = [
  "Question about a book",
  "Order or cart help",
  "Book suggestion",
  "Other",
];

// The validation rules for the form. React Hook Form runs this schema
// through zodResolver and shows each message under its field.
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters)")
    .max(60, "Name must be 60 characters or fewer"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().refine((value) => subjects.includes(value), {
    message: "Please choose a subject",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Your message must be at least 10 characters")
    .max(1000, "Your message must be 1000 characters or fewer"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const MESSAGE_MAX = 1000;

const contactDetails = [
  { icon: "✉️", label: "Email", value: "hello@booknest.example" },
  { icon: "📞", label: "Phone", value: "+1 (555) 012-3456" },
  { icon: "🕘", label: "Hours", value: "Mon–Fri, 9:00–17:00" },
  { icon: "📍", label: "Address", value: "12 Reading Lane, Booktown" },
];

function Contact() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  // Re-renders as the user types, to keep the character counter up to date.
  const messageLength = useWatch({ control, name: "message" }).length;

  // Sending is simulated: there is no backend, so we wait briefly to
  // mimic a network request and then show a confirmation.
  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSentTo(values.name);
    reset();
  };

  const inputClass = (hasError: boolean) =>
    `mt-1 w-full rounded-md border bg-white px-3 py-2.5 focus:ring-2 focus:outline-none ${
      hasError
        ? "border-red-500 focus:ring-red-100"
        : "border-stone-300 focus:border-brand-500 focus:ring-brand-100"
    }`;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-100 to-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
            Contact us
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            Questions about a book, help with your cart, or a title you'd like
            us to stock? Send us a message.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
          {sentTo ? (
            <div className="py-10 text-center" role="status">
              <p className="text-6xl" aria-hidden="true">📬</p>
              <h2 className="mt-4 font-serif text-2xl font-bold">
                Thanks, {sentTo}!
              </h2>
              <p className="mt-3 text-stone-600">
                Your message has been sent. This is a demo store, so no email
                was actually delivered.
              </p>
              <button
                type="button"
                onClick={() => setSentTo(null)}
                className="mt-8 cursor-pointer rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <h2 className="font-serif text-2xl font-bold">Send a message</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass(!!errors.name)}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="font-medium">Subject</label>
                <select
                  id="subject"
                  aria-invalid={errors.subject ? true : undefined}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={`${inputClass(!!errors.subject)} cursor-pointer`}
                  {...register("subject")}
                >
                  <option value="">Choose a subject…</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="message" className="font-medium">Message</label>
                  <span
                    className={`text-xs ${messageLength > MESSAGE_MAX ? "text-red-600" : "text-stone-500"}`}
                  >
                    {messageLength}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={6}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass(!!errors.message)} resize-y`}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold">Store information</h2>
          <dl className="mt-6 space-y-5">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">{detail.icon}</span>
                <div>
                  <dt className="text-sm text-stone-500">{detail.label}</dt>
                  <dd className="font-medium">{detail.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded-md bg-brand-50 p-4 text-sm text-stone-600">
            We usually reply within one working day.
          </p>
        </aside>
      </section>
    </>
  );
}

export default Contact;
