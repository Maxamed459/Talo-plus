import Image from "next/image";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div className="max-w-[90%] md:max-w-6xl min-h-[70vh] mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-6">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 relative px-8">
          Welcome to{" "}
          <span className="text-[#6B67FA] ">
            Talo
            <span className="">
              <Image
                src="/Talo+.svg"
                alt="Talo+ logo"
                width={40}
                height={40}
                className="absolute top-0 right-0"
              />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Your all-in-one platform for asking health questions and receive
          answers and Consulting from medical students and doctors, and
          community support. Stay connected, stay healthy.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 rounded-2xl bg-[#6B67FA] text-white font-medium shadow-md hover:bg-[#625df8] transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
