import about from "@/public/images/about.png";
import film from "@/public/images/film.png";
import photo from "@/public/images/photo.png";
import mic from "@/public/images/mic.png";

export const Metadata = {
    title: "About - About the DocShift",
    description: `About the Doshift functionality and its help in the society is given here`,
    creator: "GDSC WEB DEV TEAM",
    keywords: "image converter, video converter, audio converter, unlimited image converter, unlimited video converter",
  };
  

export default function About() {
    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center p-4">
                <div className="lg:ml-44 text-center lg:text-left">
                    <h1 className="font-bold text-3xl lg:text-5xl">ABOUT US</h1>
                    <p className="mt-6 lg:mt-10 text-lg lg:text-xl">
                        &quot;Unlock the power of seamless document conversion with our PDF converter website. Say goodbye to file format headaches as you effortlessly convert PDFs into editable documents. Whether it&apos;s Word, Excel, or PowerPoint, our user-friendly platform ensures precision and efficiency. Experience the convenience of instant conversion without compromising on quality. Join thousands of satisfied users who trust us for their document transformation needs. Embrace simplicity and reliability with our PDF converter today!&quot;
                    </p>
                </div>
                <img src={about.src} className="mt-8 lg:mt-0 lg:ml-16 h-40 lg:h-64" />
            </div>
            <div className="text-center mt-20">
                <h1 className="font-bold text-3xl lg:text-4xl">Services</h1>
                <p className="font-bold mt-2">Find the services you need</p>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-10 px-4">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-3">
                        <a href="#">
                            <img className="rounded-t-lg mx-auto mt-4" src={photo.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Image Conversion</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
                                &quot;Image conversion refers to the process of transforming an image from one file format, resolution, or color space to another.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-3">
                        <a href="#">
                            <img className="rounded-t-lg mx-auto mt-4" src={mic.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Audio Transformation</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
                                &quot;Audio transformation involves altering or manipulating sound signals to achieve desired effects or enhancements.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-3">
                        <a href="#">
                            <img className="rounded-t-lg mx-auto mt-4" src={film.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Video Metamorphosis</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
                                &quot;Video metamorphosis seamlessly transforms visual narratives, bridging imagination and reality through the art of digital evolution.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
