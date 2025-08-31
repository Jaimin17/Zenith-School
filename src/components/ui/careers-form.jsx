"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./contact-us/label";
import { Input } from "./contact-us/input";
import { Select } from "./contact-us/select";

export function CareersForm({ positions }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="mx-auto w-full max-w-none rounded-none p-10 md:rounded-2xl md:px-64">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="yourName">Your Name</Label>
            <Input
              id="yourName"
              placeholder="Tyler jo"
              type="text"
              sx={{ background: "red" }}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email">Email Id</Label>
            <Input id="email" placeholder="yourEmail@mail.com" type="email" />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input
              id="phone-number"
              placeholder="9825220510"
              type="text"
              min={"1111111111"}
              max={"9999999999"}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="location">Your Location</Label>
            <Input id="location" placeholder="" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="link">Portfolio Link/LinkedIn URL</Label>
          <Input id="link" placeholder="Paste your link here." type="url" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="position">Position applying for</Label>
          <Select id="position">
            <option key={-1} value="Select Position">Select Position</option>
            {positions.map((element, idx) => (
              <option key={idx} value={element.title}>
                {element.title}
              </option>
            ))}
          </Select>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Something about yourself</Label>
          <Input id="message" placeholder="Tell about your self." type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="resume"
          >
            Upload Resume
          </Label>
          <Input
            id="resume"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            placeholder="Upload file."
            type="file"
            aria-describedby="file_input_help"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-2xs  m-auto rounded-md bg-gradient-to-br from-gray-800 to-gray-600 font-medium text-white shadow-[0px_1px_0px_0px_rgba(255,255,255,0.4)_inset,0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset] hover:from-gray-700 hover:to-gray-500 transition-all duration-200"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
