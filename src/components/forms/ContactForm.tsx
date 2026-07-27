"use client";

import { FormEvent, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  agreed: false,
};

export const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof initialForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("Please complete your name, email, and message.");
      return;
    }

    if (!form.email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }

    if (!form.agreed) {
      setStatus("Please agree with the terms before sending.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending note...");

    try {
      const formId = process.env.NEXT_PUBLIC_WORDPRESS_CONTACT_FORM_ID;
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

      if (formId && apiUrl) {
        // Strip /graphql to get standard site root
        const siteRoot = apiUrl.replace(/\/graphql\/?$/, "");
        const endpoint = `${siteRoot}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

        const bodyFormData = new FormData();
        bodyFormData.append("your-name", form.name);
        bodyFormData.append("your-email", form.email);
        bodyFormData.append("your-phone", form.phone);
        bodyFormData.append("your-subject", form.subject);
        bodyFormData.append("your-message", form.message);

        const response = await fetch(endpoint, {
          method: "POST",
          body: bodyFormData,
        });

        const resData = await response.json();
        if (response.ok && resData.status === "mail_sent") {
          setStatus("Your note has been received. DK Jonah will reply when possible.");
          setForm(initialForm);
        } else {
          setStatus(resData.message || "Failed to send message. Please try again.");
        }
      } else {
        // Mock fallback delay for offline/local mode
        setTimeout(() => {
          setStatus("Your note has been received. DK Jonah will reply when possible.");
          setForm(initialForm);
          setIsSubmitting(false);
        }, 1000);
        return;
      }
    } catch (e) {
      console.error(e);
      setStatus("Connection error sending note. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <form className="grid gap-6" noValidate onSubmit={onSubmit}>
      <TextField
        label="Name"
        onChange={(value) => updateField("name", value)}
        placeholder="Your name"
        value={form.name}
      />
      <TextField
        label="Email"
        onChange={(value) => updateField("email", value)}
        placeholder="you@example.com"
        type="email"
        value={form.email}
      />
      <TextField
        label="Phone"
        onChange={(value) => updateField("phone", value)}
        placeholder="+1 888 555 777"
        type="tel"
        value={form.phone}
      />
      <label className="grid gap-2">
        <span className="text-sm text-[#7a7065]">Subject</span>
        <select
          className="h-14 border-b border-[#ded2c1] bg-transparent text-lg outline-none transition-colors focus:border-[#201a16]"
          onChange={(event) => updateField("subject", event.target.value)}
          value={form.subject}
        >
          <option value="">Select...</option>
          <option>General Inquiry</option>
          <option>Quiet Circle</option>
          <option>Collaboration</option>
          <option>Feedback</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-[#7a7065]">Message</span>
        <textarea
          className="min-h-36 resize-y border-b border-[#ded2c1] bg-transparent pt-3 text-lg outline-none transition-colors placeholder:text-[#9a8f83] focus:border-[#201a16]"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Write your note..."
          value={form.message}
        />
      </label>
      <label className="flex items-center gap-3 text-sm text-[#7a7065]">
        <input
          checked={form.agreed}
          className="h-4 w-4 accent-[#b68a3a]"
          onChange={(event) => updateField("agreed", event.target.checked)}
          type="checkbox"
        />
        <span>I agree with the terms and understand this is not medical advice.</span>
      </label>
      <ArrowButton className="mt-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : "Send Note"}
      </ArrowButton>
      {status ? <p className="text-sm text-[#7a7065]">{status}</p> : null}
    </form>
  );
};

type TextFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
};

const TextField = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: TextFieldProps) => (
  <label className="grid gap-2">
    <span className="text-sm text-[#7a7065]">{label}</span>
    <input
      className="h-14 border-b border-[#ded2c1] bg-transparent text-lg outline-none transition-colors placeholder:text-[#9a8f83] focus:border-[#201a16]"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  </label>
);
