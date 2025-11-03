import type { Route } from './+types';
import { Form } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Name is required';

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!subject) errors.subject = 'Subject is required';

  if (!message) errors.message = 'Message is required';

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = {
    name,
    email,
    subject,
    message,
  };

  return { message: 'Form submitted successfully', data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};

  return (
    <div className="mx-auto mt-12 max-w-3xl bg-gray-900 px-6 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        📬 Contact Me
      </h2>

      {actionData?.message ? (
        <p className="mb-6 rounded-lg border border-green-500 bg-green-700 p-4 text-center text-green-100 shadow-md">
          {actionData.message}
        </p>
      ) : null}

      <Form method="post" className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300"
          >
            Subject
          </label>

          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300"
          />

          {errors.subject && (
            <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300"
          />

          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
          Send Message
        </button>
      </Form>
    </div>
  );
};

export default ContactPage;
