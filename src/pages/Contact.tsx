import ContactForm from "../components/contact/ContactForm";
import PageHeader from "../components/shared/PageHeader";
import { STORE_INFO } from "../constants/storeInfo";

const contactDetails = [
  { icon: "✉️", label: "Email", value: STORE_INFO.email },
  { icon: "📞", label: "Phone", value: STORE_INFO.phone },
  { icon: "🕘", label: "Hours", value: STORE_INFO.hours },
  { icon: "📍", label: "Address", value: STORE_INFO.address },
];

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="We'd love to hear from you"
        description="Questions about a book, help with your cart, or a title you'd like us to stock? Send us a message."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-2xl font-bold">Store information</h2>
          <dl className="mt-6 space-y-5">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {detail.icon}
                </span>
                <div>
                  <dt className="text-sm text-stone-500">{detail.label}</dt>
                  <dd className="font-medium">{detail.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded-md bg-brand-50 p-4 text-sm text-stone-600">
            {STORE_INFO.replyTime}
          </p>
        </aside>
      </section>
    </>
  );
}

export default Contact;
