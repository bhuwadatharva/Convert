import Image from "next/image";
import about from "@/public/images/about.png";
import film from "@/public/images/film.png";
import photo from "@/public/images/photo.png";
import mic from "@/public/images/mic.png";
import Head from "next/head";

export const metadata = {
  title: "About - About the DocShift",
  description: "About the Doshift functionality and its help in society",
};

export default function About() {
  return (
    <>
      <Head>
        <meta name="creator" content="GDSC WEB DEV TEAM" />
        <meta
          name="keywords"
          content="image converter, video converter, audio converter, unlimited image converter, unlimited video converter"
        />
      </Head>

      <div className="flex flex-col lg:flex-row items-center justify-center p-4">
        <div className="lg:ml-44 text-center lg:text-left">
          <h1 className="font-bold text-3xl lg:text-5xl">ABOUT US</h1>
          <p className="mt-6 lg:mt-10 text-lg lg:text-xl">
            <p className="mt-6 lg:mt-10 text-lg lg:text-xl">
              Unlock the power of seamless document conversion with our PDF
              converter website...
            </p>
          </p>
        </div>
        <Image
          src={about}
          alt="About DocShift illustration"
          className="mt-8 lg:mt-0 lg:ml-16"
          width={400}
          height={250}
        />
      </div>

      <div className="text-center mt-20">
        <h1 className="font-bold text-3xl lg:text-4xl">Services</h1>
        <p className="font-bold mt-2">Find the services you need</p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-10 px-4">
          {[
            {
              img: photo,
              title: "Image Conversion",
              desc: "Image conversion refers...",
            },
            {
              img: mic,
              title: "Audio Transformation",
              desc: "Audio transformation involves...",
            },
            {
              img: film,
              title: "Video Metamorphosis",
              desc: "Video metamorphosis seamlessly transforms...",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow py-3"
            >
              <Image
                src={service.img}
                alt={service.title}
                className="rounded-t-lg mx-auto mt-4"
                width={200}
                height={120}
              />
              <div className="p-5 text-center">
                <h5 className="mb-2 text-xl lg:text-2xl font-bold">
                  {service.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
