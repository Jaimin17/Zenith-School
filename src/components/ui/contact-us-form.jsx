"use client";
import React from "react";
import { Label } from "./contact-us/label";
import { Input } from "./contact-us/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { TextareaAutosize } from "@mui/material";

export function ContactUsForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div
      className="shadow-input mx-auto w-full max-w-none rounded-none bg-gray-50 p-4 md:rounded-2xl md:p-8 border border-gray-200" >
      <h2 className="text-xl font-bold text-gray-800">
        Send us a message
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" sx={{ background: 'red' }} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input id="phone-number" placeholder="9825220510" type="text" min={"1111111111"} max={"9999999999"} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Message</Label>
          <Input id="message" placeholder="Enter your message" type="text" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-800 to-gray-600 font-medium text-white shadow-[0px_1px_0px_0px_rgba(255,255,255,0.4)_inset,0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset] hover:from-gray-700 hover:to-gray-500 transition-all duration-200"
          type="submit">
          Send Message &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};